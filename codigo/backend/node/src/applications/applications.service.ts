import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  ConflictException,
  ForbiddenException,
  HttpService,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as publicIp from 'public-ip';
import configuration from 'src/configuration/configuration';
import { InstanceRepository } from 'src/plugins/entities/instance/instance.repository';
import { GithubCommit, GitlabCommit } from 'src/shared/dto/commit-response';
import { RepositoryData } from 'src/shared/dto/repository-data';
import { ReturList } from 'src/shared/dto/return-list.dto';
import {
  GithubWebhookEventDto,
  GitlabWebhookEventDto,
} from 'src/shared/dto/webhook-push-event.dto';
import { GithubWebhook, GitlabWebhook } from 'src/shared/dto/webhook-response';
import { ActivityType } from 'src/shared/enum/activity-type.enum';
import { DeployStatusEnum } from 'src/shared/enum/application-status.enum';
import { DeployType } from 'src/shared/enum/deploy-message-type.enum';
import { ProvidersEnum } from 'src/shared/enum/providers.enum';
import { postgresCatch } from 'src/shared/utils/postgres-creation-default-catch';
import {
  githubApiBaseUrl,
  gitlabApiBaseUrl,
} from 'src/shared/utils/version-control-services';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { getConnection } from 'typeorm';
import { v4 } from 'uuid';
import { GetActivities } from './dto/activities/get-activities.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ReqCreateDto } from './dto/deploys/req-create.dto';
import { ReqDeleteDto } from './dto/deploys/req-delete.dto';
import { ReqUpdateDto } from './dto/deploys/req-update.dto';
import { ResCreateDto } from './dto/deploys/res-create.dto';
import { ResDeleteDto } from './dto/deploys/res-delete.dto';
import { ResUpdateDto } from './dto/deploys/res-update.dto';
import { BaseEnvironment } from './dto/environments/basic-environment.dto';
import { FindApplicationQueryDto } from './dto/find-application-query.dto';
import { GetApplication } from './dto/get-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Activity } from './entities/activities/activity.entity';
import { ActivityRepository } from './entities/activities/activity.repository';
import { applicationCacheId } from './entities/application.cache';
import { Application } from './entities/application.entity';
import { ApplicationRepository } from './entities/application.repository';
import { Deploy } from './entities/deploys/deploys.entity';
import { DeploysRepository } from './entities/deploys/deploys.repository';
import { Environment } from './entities/environments/environments.entity';

dotenv.config();

const config = configuration();
const {
  publicHost,
  port,
  amqp: { defaultExchange, apps },
} = config;

@Injectable()
export class ApplicationsService {
  constructor(
    private applicationRepository: ApplicationRepository,
    private instanceRepository: InstanceRepository,
    private deploysRepository: DeploysRepository,
    private activityRepository: ActivityRepository,
    private userService: UsersService,
    private amqpConnection: AmqpConnection,
    private httpService: HttpService,
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto,
    user: User,
  ): Promise<Application> {
    const nameAlreadyUsed =
      !!(await this.instanceRepository.findOne({
        where: { name: createApplicationDto.name },
      })) ||
      !!(await this.applicationRepository.findOne({
        where: { name: createApplicationDto.name },
      }));

    if (nameAlreadyUsed) throw new ConflictException('Nome já utilizado');

    const {
      repositoryOwner,
      repositoryName,
      repositoryRef,
      provider,
    } = createApplicationDto;

    const commit = await this.getCommitData({
      repositoryOwner,
      repositoryName,
      repositoryRef,
      provider,
      user,
    });

    const application = await this.applicationRepository.createApplication(
      createApplicationDto,
      user,
    );

    this.createNewDeploy(application, user, commit);
    this.createActivity(application, commit);
    this.createApplicationHook(application);
    getConnection().queryResultCache.remove([
      applicationCacheId.findAllApplications(),
    ]);

    return application;
  }

  private async getCommitData({
    repositoryOwner,
    repositoryName,
    repositoryRef,
    provider,
    user,
  }: RepositoryData): Promise<string> {
    switch (provider) {
      case ProvidersEnum.GITHUB:
        return this.getGithubCommitData(
          repositoryOwner,
          repositoryName,
          repositoryRef,
          user,
        );
      case ProvidersEnum.GITLAB:
        return this.getGitlabCommitData(
          repositoryOwner,
          repositoryName,
          repositoryRef,
          user,
        );
    }
  }

  private async createActivity(
    application: Application,
    commit: string,
    type: ActivityType = ActivityType.CREATING,
    error?: string,
  ): Promise<Activity> {
    const activity = this.activityRepository.create({
      id: v4(),
      application,
      commit,
      type,
      error,
    });
    try {
      const savedActivity = await activity.save();
      getConnection().queryResultCache.remove([
        applicationCacheId.findAllApplications(),
      ]);
      return savedActivity;
    } catch (e) {
      postgresCatch(e);
    }
  }

  private async getGithubCommitData(
    repositoryOwner: string,
    repositoryName: string,
    repositoryRef: string,
    user: User,
  ): Promise<string> {
    const createWebhookUrl = `${githubApiBaseUrl}/repos/${repositoryOwner}/${repositoryName}/commits/refs/heads/${repositoryRef}`;

    const createWebhookConfig = {
      headers: {
        Authorization: 'Bearer ' + user.gitHubToken,
      },
    };

    const commit = await this.httpService
      .get<GithubCommit>(createWebhookUrl, createWebhookConfig)
      .toPromise();

    if (!commit.data) {
      throw new NotFoundException('Não foi encontrado os dados do repositório');
    }

    return commit.data.sha;
  }

  private async getGitlabCommitData(
    repositoryOwner: string,
    repositoryName: string,
    repositoryRef: string,
    user: User,
  ): Promise<string> {
    const getCommitDataUrl = `${gitlabApiBaseUrl}/projects/${repositoryOwner}%2F${repositoryName}/repository/commits/${repositoryRef}`;

    const createWebhookConfig = {
      headers: {
        Authorization: 'Bearer ' + user.gitLabToken,
      },
    };

    const commit = await this.httpService
      .get<GitlabCommit>(getCommitDataUrl, createWebhookConfig)
      .toPromise();

    if (!commit.data) {
      throw new NotFoundException('Não foi encontrado os dados do repositório');
    }

    return commit.data.id;
  }

  async findAll(
    query: FindApplicationQueryDto,
    user: User,
  ): Promise<ReturList<Application>> {
    try {
      return await this.applicationRepository.findAll(query, user);
    } catch (e) {
      return e;
    }
  }

  async findOnebyId(appId: string, user: User): Promise<GetApplication> {
    const application = this.findCompleteApplication(appId, user);

    return this.getPubicApplicationFields(await application);
  }

  private async findCompleteApplication(
    appId: string,
    user: User,
  ): Promise<Application> {
    const application = await this.applicationRepository.findOne(appId, {
      cache: {
        id: applicationCacheId.findApplicationById(appId),
        milliseconds: 30000,
      },
    });
    this.verifyApplicationFetch(application, user);
    return application;
  }

  private verifyApplicationFetch(application: Application, user?: User) {
    if (!application)
      throw new NotFoundException('Aplicação não foi encontrada');
    if (user && application.userId !== user.id)
      throw new ForbiddenException('Você não tem acesso à essa aplicação');
  }

  async findOnebyName(name: string, user: User): Promise<GetApplication> {
    const application = await this.applicationRepository.findOne({
      where: { name },
      cache: {
        id: applicationCacheId.findApplicationById(name),
        milliseconds: 30000,
      },
    });
    this.verifyApplicationFetch(application, user);

    return this.getPubicApplicationFields(application);
  }

  private getPubicApplicationFields(application: Application): GetApplication {
    const {
      id,
      name,
      url,
      userId,
      provider,
      repositoryId,
      repositoryURL,
      repositoryName,
      repositoryOwner,
      repositoryPath,
      repositoryRef,
      environments,
    } = application;

    return {
      id,
      name,
      url,
      userId,
      provider,
      repositoryId,
      repositoryURL,
      repositoryName,
      repositoryOwner,
      repositoryPath,
      repositoryRef,
      environments,
    };
  }

  async update(
    id: string,
    updateApplicationDto: UpdateApplicationDto,
    user: User,
  ): Promise<GetApplication> {
    const application = await this.findCompleteApplication(id, user);

    const {
      repositoryPath,
      repositoryRef,
      environments,
    } = updateApplicationDto;

    if (repositoryPath) {
      application.repositoryPath = repositoryPath;
    }
    if (repositoryRef) {
      application.repositoryRef = repositoryRef;
    }
    if (environments) {
      application.environments = this.mapEnvironments(
        environments,
        application.id,
      );
    }

    try {
      await application.save();
      getConnection().queryResultCache.remove([
        applicationCacheId.findAllApplications(),
        applicationCacheId.findApplicationById(application.id),
        applicationCacheId.findApplicationByName(application.name),
      ]);
      const {
        repositoryOwner,
        repositoryName,
        repositoryRef: ref,
        provider,
      } = application;

      const commit = await this.getCommitData({
        repositoryOwner,
        repositoryName,
        repositoryRef: ref,
        provider,
        user,
      });
      this.createUpdateDeploy(application, commit);
      this.updateLastCreatingActivity(
        application.id,
        ActivityType.FAIL,
        'Cancelado por uma atualização',
      );
      this.createActivity(application, commit);

      getConnection().queryResultCache.remove([
        applicationCacheId.findAllApplications(),
        applicationCacheId.findApplicationById(application.id),
        applicationCacheId.findApplicationById(application.name),
      ]);
      return this.findOnebyId(id, user);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  private async createUpdateDeploy(
    application: Application,
    commit: string,
  ): Promise<ReqUpdateDto> {
    const deployReq = await this.deploysRepository.createUpdateDeploy(
      application,
      commit,
    );

    this.sendUpdateDeployMessage(deployReq);

    return deployReq;
  }

  private async createDeleteDeploy(
    application: Application,
  ): Promise<ReqDeleteDto> {
    const deployReq = await this.deploysRepository.createDeleteDeploy(
      application,
    );

    this.sendDeleteDeployMessage(deployReq);

    return deployReq;
  }

  async remove(id: string, user: User): Promise<string> {
    const application = await this.findCompleteApplication(id, user);

    try {
      this.createDeleteDeploy(application);
      return 'A applicação será deletada';
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  private async createNewDeploy(
    application: Application,
    user: User,
    commit: string,
  ): Promise<ReqCreateDto> {
    const fechedUser = this.userService.findCompleteUserById(user.id);

    const deployReq = await this.deploysRepository.createNewDeploy(
      application,
      await fechedUser,
      commit,
    );

    this.sendNewDeployMessage(deployReq);

    return deployReq;
  }

  private async deleteWebHooks(application: Application): Promise<boolean> {
    const user = await this.userService.findCompleteUserById(
      application.userId,
    );

    switch (application.provider) {
      case ProvidersEnum.GITHUB:
        this.deleteGithubWebhooks(application, user);
        return true;
      case ProvidersEnum.GITLAB:
        this.deleteGitlabWebhooks(application, user);
        return true;
    }
  }

  private deleteGithubWebhooks(application: Application, user: User): void {
    const { repositoryOwner, repositoryName, hookId } = application;

    const getCommitDataUrl = `${githubApiBaseUrl}/repos/${repositoryOwner}/${repositoryName}/hooks/${hookId}`;

    const createWebhookConfig = {
      headers: {
        Authorization: 'Bearer ' + user.gitHubToken,
      },
    };

    this.httpService.delete(getCommitDataUrl, createWebhookConfig).toPromise();
  }

  private deleteGitlabWebhooks(application: Application, user: User): void {
    const { repositoryOwner, repositoryName, hookId } = application;

    const getCommitDataUrl = `${gitlabApiBaseUrl}/projects/${repositoryOwner}%2F${repositoryName}/hooks/${hookId}`;

    const createWebhookConfig = {
      headers: {
        Authorization: 'Bearer ' + user.gitLabToken,
      },
    };

    this.httpService.delete(getCommitDataUrl, createWebhookConfig).toPromise();
  }

  @RabbitSubscribe({
    exchange: defaultExchange,
    routingKey: apps.update.res.routingKey,
    queue: apps.update.res.queue,
  })
  async reciveUpdateDeployResponse(updateMessage: ResUpdateDto): Promise<void> {
    const deploy = await this.deploysRepository.findOne(updateMessage.id);

    if (deploy.type !== DeployType.UPDATE) return;

    deploy.status = updateMessage.success
      ? DeployStatusEnum.SUCCESS
      : DeployStatusEnum.FAIL;

    deploy.error = updateMessage.error;

    deploy.save();

    if (updateMessage.success) {
      this.updateLastCreatingActivity(
        deploy.applicationId,
        ActivityType.SUCCESS,
      );
    } else {
      this.updateLastCreatingActivity(
        deploy.applicationId,
        ActivityType.FAIL,
        updateMessage.error,
      );
    }
  }

  @RabbitSubscribe({
    exchange: defaultExchange,
    routingKey: apps.create.res.routingKey,
    queue: apps.create.res.queue,
  })
  async reciveNewDeployResponse(updateMessage: ResCreateDto): Promise<void> {
    const deploy = await this.deploysRepository.findOne(updateMessage.id);

    if (deploy.type !== DeployType.CREATE) return;

    deploy.status = updateMessage.success
      ? DeployStatusEnum.SUCCESS
      : DeployStatusEnum.FAIL;

    deploy.error = updateMessage.error;

    deploy.save();

    if (updateMessage.success) {
      const app = await this.applicationRepository.findOne(
        deploy.applicationId,
      );
      app.url = updateMessage.url;
      await app.save();
      this.updateLastCreatingActivity(
        deploy.applicationId,
        ActivityType.SUCCESS,
      );
    } else {
      this.updateLastCreatingActivity(
        deploy.applicationId,
        ActivityType.FAIL,
        updateMessage.error,
      );
    }
  }

  @RabbitSubscribe({
    exchange: defaultExchange,
    routingKey: apps.delete.res.routingKey,
    queue: apps.delete.res.queue,
  })
  async reciveDeleteDeployResponse(updateMessage: ResDeleteDto): Promise<void> {
    const deploy = await this.deploysRepository.findOne(updateMessage.id);

    if (deploy.type !== DeployType.DELETE) return;

    deploy.status = updateMessage.success
      ? DeployStatusEnum.SUCCESS
      : DeployStatusEnum.FAIL;

    deploy.error = updateMessage.error;

    deploy.save();

    if (updateMessage.success) {
      await this.updateLastCreatingActivity(
        deploy.applicationId,
        ActivityType.FAIL,
        'A aplicação foi deletada',
      );
      const application = await this.applicationRepository.findOne(
        deploy.applicationId,
      );

      if (await this.deleteWebHooks(application)) {
        await this.applicationRepository.delete(deploy.applicationId);
        getConnection().queryResultCache.remove([
          applicationCacheId.findAllApplications(),
          applicationCacheId.findApplicationById(application.id),
          applicationCacheId.findApplicationByName(application.name),
        ]);
      }
    }
  }

  private async updateLastCreatingActivity(
    applicationId: string,
    type: ActivityType,
    error?: string,
  ): Promise<Activity> {
    const lastCreatingActivity = await this.activityRepository.findOne({
      where: {
        application: { id: applicationId },
        type: ActivityType.CREATING,
      },
    });
    if (!lastCreatingActivity) {
      return;
    }

    lastCreatingActivity.type = type;
    lastCreatingActivity.error = error;
    return await lastCreatingActivity.save();
  }

  async getOneDeploy(id: string, user: User): Promise<Deploy> {
    const deploy = await this.deploysRepository.findOne(id);

    if (!deploy) throw new NotFoundException('Deploy não encontrado');

    await this.findOnebyId(deploy.applicationId, user);

    return deploy;
  }

  async getDeploys(appId: string, user: User): Promise<ReturList<Deploy>> {
    const { id } = await this.findCompleteApplication(appId, user);
    const deploys = await this.deploysRepository.find({
      where: { application: { id } },
      order: { createdAt: 'ASC' },
    });

    return { items: deploys, total: deploys.length };
  }

  async reciveWebhook(
    appId: string,
    webhook: GithubWebhookEventDto | GitlabWebhookEventDto,
  ): Promise<boolean> {
    const application = await this.applicationRepository.findOne(appId);
    this.verifyApplicationFetch(application);

    if (`refs/heads/${application.repositoryRef}` === webhook.ref) {
      const user = await this.userService.findCompleteUserById(
        application.userId,
      );
      const commit =
        webhook instanceof GithubWebhookEventDto
          ? webhook.head_commit.id
          : webhook.commits[0].id;
      this.createNewDeploy(application, user, commit);

      this.updateLastCreatingActivity(
        application.id,
        ActivityType.FAIL,
        'Novo webhook cancelou essa criação',
      );
      this.createActivity(application, commit);
      return true;
    }
    return false;
  }

  private mapEnvironments(
    baseEnvironments: BaseEnvironment[],
    applicationId: string,
  ): Environment[] {
    return baseEnvironments.map<Environment>(({ key, value }) => {
      const env = new Environment();

      env.id = v4();
      env.key = key;
      env.value = value;
      env.applicationId = applicationId;

      try {
        env.save();
        return env;
      } catch (e) {
        throw new InternalServerErrorException(e);
      }
    });
  }

  private sendNewDeployMessage(payload: ReqCreateDto): void {
    this.amqpConnection.publish(
      defaultExchange,
      apps.create.req.routingKey,
      payload,
      {
        contentType: 'application/json',
      },
    );
  }

  private sendUpdateDeployMessage(payload: ReqUpdateDto): void {
    this.amqpConnection.publish(
      defaultExchange,
      apps.update.req.routingKey,
      payload,
      {
        contentType: 'application/json',
      },
    );
  }

  private sendDeleteDeployMessage(payload: ReqDeleteDto): void {
    this.amqpConnection.publish(
      defaultExchange,
      apps.delete.req.routingKey,
      payload,
      {
        contentType: 'application/json',
      },
    );
  }

  private async createApplicationHook(application: Application): Promise<void> {
    switch (application.provider) {
      case ProvidersEnum.GITHUB:
        const githubHook = await this.createGithubApplicationHook(application);
        application.hookId = githubHook.id;
        break;
      case ProvidersEnum.GITLAB:
        const gitlabHook = await this.createGitlabApplicationHook(application);
        application.hookId = gitlabHook.id;
        break;
    }
    await application.save();
  }

  async createGithubApplicationHook(
    application: Application,
  ): Promise<GithubWebhook> {
    const user = await this.userService.findCompleteUserById(
      application.userId,
    );

    const createWebhookUrl = `${githubApiBaseUrl}/repos/${application.repositoryOwner}/${application.repositoryName}/hooks`;

    const host = publicHost || `http://${await publicIp.v4()}:${port}`;

    const createWebhookBody = {
      config: {
        url: `${host}/applications/${application.id}/hook`,
        content_type: 'json',
        secret: application.webhookToken,
      },
    };

    const createWebhookConfig = {
      headers: {
        Authorization: 'Bearer ' + user.gitHubToken,
      },
    };
    try {
      return (
        await this.httpService
          .post<GithubWebhook>(
            createWebhookUrl,
            createWebhookBody,
            createWebhookConfig,
          )
          .toPromise()
      ).data;
    } catch (e) {}
  }

  private async createGitlabApplicationHook(
    application: Application,
  ): Promise<GitlabWebhook> {
    const user = await this.userService.findCompleteUserById(
      application.userId,
    );

    const createWebhookUrl = `${gitlabApiBaseUrl}/projects/${application.repositoryOwner}%2F${application.repositoryName}/hooks`;

    const host = publicHost || `http://${await publicIp.v4()}:${port}`;

    const createWebhookBody = {
      url: `${host}/applications/${application.id}/hook`,
    };

    const createWebhookConfig = {
      headers: {
        Authorization: 'Bearer ' + user.gitLabToken,
      },
    };
    try {
      return (
        await this.httpService
          .post<GitlabWebhook>(
            createWebhookUrl,
            createWebhookBody,
            createWebhookConfig,
          )
          .toPromise()
      ).data;
    } catch (e) {}
  }

  async getAppActivities(user: User, appId: string): Promise<GetActivities> {
    const application = await this.findOnebyId(appId, user);
    const activities = await this.activityRepository.find({
      where: { application },
      order: { createdAt: 'DESC' },
      select: Activity.publicAttributes,
    });

    return { activities };
  }

  async doRollBack(user: User, appId: string): Promise<boolean> {
    const activities = (await this.getAppActivities(user, appId)).activities;
    const actualActivity = activities[0];

    if (actualActivity.type === ActivityType.SUCCESS) {
      const rollbackToActivity = activities.find(
        (activity, index) =>
          (activity.type === ActivityType.SUCCESS ||
            activity.type === ActivityType.ROLLBACK) &&
          index > 0 &&
          activity.commit !== actualActivity.commit,
      );
      if (!rollbackToActivity) {
        return false;
      }

      const application = await this.findCompleteApplication(appId, user);

      this.updateLastCreatingActivity(
        application.id,
        ActivityType.FAIL,
        'Cancelado devido a solicitação de rollback',
      );
      this.createActivity(
        application,
        rollbackToActivity.commit,
        ActivityType.ROLLBACK,
      );
      this.createUpdateDeploy(application, rollbackToActivity.commit);
      return true;
    }

    return false;
  }

  async undoRollBack(user: User, appId: string): Promise<boolean> {
    const activities = (await this.getAppActivities(user, appId)).activities;
    const actualActivity = activities[0];

    if (actualActivity.type === ActivityType.ROLLBACK) {
      const cancelRollbackActivity = activities.find(
        (activity, index) =>
          activity.type === ActivityType.SUCCESS &&
          index > 0 &&
          activity.commit !== actualActivity.commit,
      );
      if (!cancelRollbackActivity) {
        return false;
      }

      const application = await this.findCompleteApplication(appId, user);

      this.updateLastCreatingActivity(
        application.id,
        ActivityType.FAIL,
        'Cancelado devido a solicitação de cancelamento de um rollback',
      );
      this.createActivity(
        application,
        cancelRollbackActivity.commit,
        ActivityType.SUCCESS,
      );
      this.createUpdateDeploy(application, cancelRollbackActivity.commit);
      return true;
    }

    return false;
  }
}
