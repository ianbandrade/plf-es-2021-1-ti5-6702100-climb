import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  ForbiddenException,
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

@Injectable()
export class ApplicationsService {
  constructor(
    private applicationRepository: ApplicationRepository,
    private deploysRepository: DeploysRepository,
    private userService: UsersService,
    private amqpConnection: AmqpConnection,
  ) {}

  create(createApplicationDto: CreateApplicationDto, user: User) {
    return this.applicationRepository.createApplication(
      createApplicationDto,
      user,
    );
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
    const deleteResult = await this.applicationRepository.delete({
      id,
      userId: user.id,
    });
    return deleteResult.affected > 0;
  }

  async createDeploy(appId: string, user: User) {
    const application = await this.applicationRepository.findOne(appId);
    if (!application)
      throw new NotFoundException('Aplicação não foi encontrado');
    if (application.userId !== user.id)
      throw new ForbiddenException('Você não tem acesso à essa aplicação');

    const fechedUser = this.userService.findCompleteUserById(user.id);

    const payload = await this.deploysRepository.createDeploy(
      application,
      await fechedUser,
    );

    this.amqpConnection.publish('amq.direct', 'apps.deploy.req', payload, {
      contentType: 'application/json',
    });

    return payload;
  }

  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'apps.deploy.res',
    queue: 'apps.deploy.res',
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

  mapEnvironments(baseEnvironments: BaseEnvironment[], applicationId: string) {
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
}
