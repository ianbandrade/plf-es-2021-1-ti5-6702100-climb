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

dotenv.config();

const config = configuration();
const {
  port,
  amqp: { defaultExchange, apps },
} = config;

@Injectable()
export class ApplicationsService {
  constructor(
    private applicationRepository: ApplicationRepository,
    private deploysRepository: DeploysRepository,
    private userService: UsersService,
    private amqpConnection: AmqpConnection,
    private httpService: HttpService,
  ) {}

  async create(createApplicationDto: CreateApplicationDto, user: User) {
    const application = await this.applicationRepository.createApplication(
      createApplicationDto,
      user,
    );

    this.createDeploy(application.id, user);

    return application;
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
    const application = await this.applicationRepository.findOne(appId);
    if (!application)
      throw new NotFoundException('Aplicação não foi encontrado');
    if (application.userId !== user.id)
      throw new ForbiddenException('Você não tem acesso à essa aplicação');

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
    const application = await this.applicationRepository.findOne(id);
    if (!application)
      throw new NotFoundException('Aplicação não foi encontrado');
    if (application.userId !== user.id)
      throw new ForbiddenException('Você não tem acesso à essa aplicação');

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
      return this.applicationRepository.findOne(id);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async remove(id: string, user: User): Promise<boolean> {
    const application = await this.applicationRepository.findOne(id);
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
    if (!application)
      throw new NotFoundException('Aplicação não foi encontrado');
    if (application.userId !== user.id)
      throw new ForbiddenException('Você não tem acesso à essa aplicação');

    const fechedUser = this.userService.findCompleteUserById(user.id);

    const deployReq = await this.deploysRepository.createDeploy(
      application,
      await fechedUser,
    );

    this.sendNewDeployMessage(deployReq);

    this.createApplicationHook(application);

    return deployReq;
  }

  @RabbitSubscribe({
    exchange: defaultExchange,
    routingKey: apps.res.routingKey,
    queue: apps.res.queue,
  })
  async deployResponse(updateMessage: ResDeployDto) {
    const deploy = await this.deploysRepository.findOne(updateMessage.id);

    deploy.status = updateMessage.success
      ? DeployStatusEnum.SUCCESS
      : DeployStatusEnum.FAIL;

    deploy.error = updateMessage.error;

    deploy.save();
  }

  async getOneDeploy(id: string, user: User) {
    const deploy = await this.deploysRepository.findOne(id);

    if (!deploy) throw new NotFoundException('Deploy não encontrado');

    await this.findOne(deploy.applicationId, user);

    return deploy;
  }

  async getDeploys(appId: string, user: User): Promise<ReturList<Deploys>> {
    const application = await this.applicationRepository.findOne(appId);
    if (!application)
      throw new NotFoundException('Aplicação não foi encontrado');
    if (application.userId !== user.id)
      throw new ForbiddenException('Você não tem acesso à essa aplicação');

    const { deploys } = application;

    return { items: deploys, total: deploys.length };
  }

  async reciveWebhook(
    appId: string,
    webhook: GithubWebhookEventDto | GitlabWebhookEventDto,
  ) {
    const application = await this.applicationRepository.findOne(appId);
    if (!application) {
      throw new NotFoundException('A aplicação não foi encontrada');
    }

    if (application.repositoryRef === webhook.ref) {
      const user = this.userService.findUserById(application.userId);
      const deployReq = this.deploysRepository.createDeploy(
        application,
        await user,
      );
      this.sendNewDeployMessage(await deployReq);
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
    this.amqpConnection.publish('', apps.req.routingKey, payload, {
      contentType: 'application/json',
    });
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
    const urlSplited = application.repositoryURL.split('/');
    const owner = urlSplited[3];
    const repo = urlSplited[4];

    const createWebhookUrl = `https://api.github.com/repos/${owner}/${repo}/hooks`;

    const host = await publicIp.v4();

    const createWebhookBody = {
      config: {
        url: `${host}:${port}/${application.id}/hook`,
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
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private async createGitlabApplicationHook(application: Application) {
    const user = await this.userService.findCompleteUserById(
      application.userId,
    );

    const urlSplited = application.repositoryURL.split('/');
    const owner = urlSplited[3];
    const repo = urlSplited[4];

    const createWebhookUrl = `https://gitlab.com/api/v4/projects/${owner}%2F${repo}/hooks`;

    const host = await publicIp.v4();
    debugger;

    const createWebhookBody = {
      url: `${host}:${port}/applications/${application.id}/hook`,
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
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
