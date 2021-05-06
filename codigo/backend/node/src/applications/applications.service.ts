import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  ForbiddenException,
  HttpService,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ReturList } from 'src/shared/dto/return-list.dto';
import { DeployStatusEnum } from 'src/shared/enum/application-status.enum';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { v4 } from 'uuid';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ResDeployDto } from './dto/deploys/res-deploy.dto';
import { BaseEnvironment } from './dto/environments/basic-environment.dto';
import { FindApplicationQueryDto } from './dto/find-application-query.dto';
import { GetApplication } from './dto/get-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';
import { ApplicationRepository } from './entities/application.repository';
import { Deploys } from './entities/deploys/deploys.entity';
import { DeploysRepository } from './entities/deploys/deploys.repository';
import { Environment } from './entities/environments/environments.entity';
import * as dotenv from 'dotenv';
import configuration from 'src/configuration/configuration';
import { ReqDeployDto } from './dto/deploys/req-deploy.dto';
import * as publicIp from 'public-ip';
import { ProvidersEnum } from 'src/shared/enum/providers.enum';
import {
  GithubWebhookEventDto,
  GitlabWebhookEventDto,
} from 'src/shared/dto/webhook-push-event.dto';
import { ActivityRepository } from './entities/activities/activity.repository';
import { GithubCommit, GitlabCommit } from 'src/shared/dto/commit-response';
import { ActivityType } from 'src/shared/enum/activity-type.enum';
import { postgresCatch } from 'src/shared/utils/postgres-creation-default-catch';
import { Activity } from './entities/activities/activity.entity';

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
    private deploysRepository: DeploysRepository,
    private activityRepository: ActivityRepository,
    private userService: UsersService,
    private amqpConnection: AmqpConnection,
    private httpService: HttpService,
  ) {}

  async create(createApplicationDto: CreateApplicationDto, user: User) {
    const commit = await this.getCommitData(
      createApplicationDto.repositoryOwner,
      createApplicationDto.repositoryName,
      createApplicationDto.repositoryRef,
      createApplicationDto.provider,
      user,
    );

    const application = await this.applicationRepository.createApplication(
      createApplicationDto,
      user,
    );

    this.createDeploy(application.id, user);
    this.createActivity(application, commit);
    this.createApplicationHook(application);

    return application;
  }

  private async getCommitData(
    repositoryOwner: string,
    repositoryName: string,
    repositoryRef: string,
    provider: string,
    user: User,
  ) {
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
  ) {
    const activity = this.activityRepository.create({
      id: v4(),
      application,
      commit,
      type,
      error,
    });
    try {
      return await activity.save();
    } catch (e) {
      postgresCatch(e);
    }
  }

  private async getGithubCommitData(
    repositoryOwner: string,
    repositoryName: string,
    repositoryRef: string,
    user: User,
  ) {
    const createWebhookUrl = `https://api.github.com/repos/${repositoryOwner}/${repositoryName}/commits/refs/heads/${repositoryRef}`;

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

    return commit.data.sha.slice(0, 8);
  }

  private async getGitlabCommitData(
    repositoryOwner: string,
    repositoryName: string,
    repositoryRef: string,
    user: User,
  ) {
    const createWebhookUrl = `https://gitlab.com/api/v4/projects/${repositoryOwner}%2F${repositoryName}/repository/commits/${repositoryRef}`;

    const createWebhookConfig = {
      headers: {
        Authorization: 'Bearer ' + user.gitLabToken,
      },
    };

    const commit = await this.httpService
      .get<GitlabCommit>(createWebhookUrl, createWebhookConfig)
      .toPromise();

    if (!commit.data) {
      throw new NotFoundException('Não foi encontrado os dados do repositório');
    }

    return commit.data.id.slice(0, 8);
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

  async findOne(appId: string, user: User): Promise<GetApplication> {
    const application = this.findCompleteApplication(appId, user);

    return this.getPubicApplicationFields(await application);
  }

  private async findCompleteApplication(appId: string, user: User) {
    const application = await this.applicationRepository.findOne(appId);
    this.verifyApplicationFetch(application, user);
    return application;
  }

  private verifyApplicationFetch(application: Application, user?: User) {
    if (!application)
      throw new NotFoundException('Aplicação não foi encontrado');
    if (user && application.userId !== user.id)
      throw new ForbiddenException('Você não tem acesso à essa aplicação');
  }

  async findOnebyName(name: string, user: User) {
    const application = await this.applicationRepository.findOne({
      where: { name },
    });
    this.verifyApplicationFetch(application, user);

    return this.getPubicApplicationFields(application);
  }

  private getPubicApplicationFields(application: Application) {
    const {
      id,
      name,
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
  ) {
    const application = await this.findCompleteApplication(id, user);

    const {
      name,
      repositoryPath,
      repositoryRef,
      environments,
    } = updateApplicationDto;

    application.name = name;
    application.repositoryPath = repositoryPath;
    application.repositoryRef = repositoryRef;
    application.environments = this.mapEnvironments(
      environments,
      application.id,
    );

    try {
      await application.save();
      this.sendUpdateDeployMessage();

      return this.findOne(id, user);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  sendUpdateDeployMessage() {
    throw new Error('Method not implemented.');
  }

  async remove(id: string, user: User): Promise<boolean> {
    const application = await this.findCompleteApplication(id, user);
    if (!application) return false;

    if (application.userId !== user.id) return false;

    try {
      const deleteResult = await this.applicationRepository.delete(id);
      return deleteResult.affected > 0;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async createDeploy(appId: string, user: User) {
    const application = await this.applicationRepository.findOne(appId);
    this.verifyApplicationFetch(application, user);

    const fechedUser = this.userService.findCompleteUserById(user.id);

    const deployReq = await this.deploysRepository.createDeploy(
      application,
      await fechedUser,
    );

    this.sendNewDeployMessage(deployReq);

    return deployReq;
  }

  @RabbitSubscribe({
    exchange: defaultExchange,
    routingKey: apps.deploys.res.routingKey,
    queue: apps.deploys.res.queue,
  })
  async deployResponse(updateMessage: ResDeployDto) {
    const deploy = await this.deploysRepository.findOne(updateMessage.id);

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

  private async updateLastCreatingActivity(
    applicationId: string,
    type: ActivityType,
    error?: string,
  ) {
    const lastCreatingActivity = await this.activityRepository.findOne({
      where: {
        application: { id: applicationId },
        type: ActivityType.CREATING,
      },
    });
    lastCreatingActivity.type = type;
    lastCreatingActivity.error = error;
    return await lastCreatingActivity.save();
  }

  async getOneDeploy(id: string, user: User) {
    const deploy = await this.deploysRepository.findOne(id);

    if (!deploy) throw new NotFoundException('Deploy não encontrado');

    await this.findOne(deploy.applicationId, user);

    return deploy;
  }

  async getDeploys(appId: string, user: User): Promise<ReturList<Deploys>> {
    const application = await this.findCompleteApplication(appId, user);

    const { deploys } = application;

    return { items: deploys, total: deploys.length };
  }

  async reciveWebhook(
    appId: string,
    webhook: GithubWebhookEventDto | GitlabWebhookEventDto,
  ) {
    const application = await this.applicationRepository.findOne(appId);
    this.verifyApplicationFetch(application);

    if (`refs/heads/${application.repositoryRef}` === webhook.ref) {
      const user = await this.userService.findCompleteUserById(
        application.userId,
      );
      const deployReq = this.deploysRepository.createDeploy(application, user);
      this.sendNewDeployMessage(await deployReq);

      this.updateLastCreatingActivity(
        application.id,
        ActivityType.FAIL,
        'Novo webhook cancelou essa criação',
      );
      this.createActivity(
        application,
        (webhook instanceof GithubWebhookEventDto
          ? webhook.head_commit.id
          : webhook.commits[0].id
        ).slice(0, 8),
      );
      return true;
    }
    return false;
  }

  private mapEnvironments(
    baseEnvironments: BaseEnvironment[],
    applicationId: string,
  ) {
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

  private sendNewDeployMessage(payload: ReqDeployDto) {
    this.amqpConnection.publish(
      defaultExchange,
      apps.deploys.req.routingKey,
      payload,
      {
        contentType: 'application/json',
      },
    );
  }

  private createApplicationHook(application: Application) {
    switch (application.provider) {
      case ProvidersEnum.GITHUB:
        return this.createGithubApplicationHook(application);
      case ProvidersEnum.GITLAB:
        return this.createGitlabApplicationHook(application);
    }
  }

  async createGithubApplicationHook(application: Application) {
    const user = await this.userService.findCompleteUserById(
      application.userId,
    );

    const createWebhookUrl = `https://api.github.com/repos/${application.repositoryOwner}/${application.repositoryName}/hooks`;

    const host = publicHost || `${await publicIp.v4()}:${port}`;

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
      return await this.httpService
        .post(createWebhookUrl, createWebhookBody, createWebhookConfig)
        .toPromise();
    } catch (e) {}
  }

  private async createGitlabApplicationHook(application: Application) {
    const user = await this.userService.findCompleteUserById(
      application.userId,
    );

    const createWebhookUrl = `https://gitlab.com/api/v4/projects/${application.repositoryOwner}%2F${application.repositoryName}/hooks`;

    const host = publicHost || `${await publicIp.v4()}:${port}`;
    debugger;

    const createWebhookBody = {
      url: `${host}/applications/${application.id}/hook`,
    };

    const createWebhookConfig = {
      headers: {
        Authorization: 'Bearer ' + user.gitLabToken,
      },
    };
    try {
      return await this.httpService
        .post(createWebhookUrl, createWebhookBody, createWebhookConfig)
        .toPromise();
    } catch (e) {}
  }

  async getAppActivities(user: User, appId: string) {
    const application = await this.findOne(appId, user);
    const activities = await this.activityRepository.find({
      where: { application },
      order: { createdAt: 'DESC' },
      select: Activity.publicAttributes,
    });

    return activities;
  }
}
