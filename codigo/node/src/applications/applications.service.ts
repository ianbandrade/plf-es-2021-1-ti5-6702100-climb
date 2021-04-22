import {
  AmqpConnection,
  RabbitHandler,
  RabbitRPC,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReturList } from 'src/shared/dto/return-list.dto';
import { DeployStatusEnum } from 'src/shared/enum/application-status.enum';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ResDeployDto } from './dto/deploys/res-deploy.dto';
import { FindApplicationQueryDto } from './dto/find-application-query.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';
import { ApplicationRepository } from './entities/application.repository';
import { Deploys } from './entities/deploys/deploys.entity';
import { DeploysRepository } from './entities/deploys/deploys.repository';

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

  async findOne(id: string, user: User): Promise<Application> {
    const application = await this.applicationRepository.findOne(id);
    if (!application)
      throw new NotFoundException('Aplicação não foi encontrado');
    if (application.userId !== user.id)
      throw new ForbiddenException('Você não tem acesso à essa aplicação');

    return application;
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

    await this.applicationRepository.update({ id }, updateApplicationDto);
    return this.applicationRepository.findOne(id);
  }

  async remove(id: string, user: User): Promise<boolean> {
    const deleteResult = await this.applicationRepository.delete({
      id,
      userId: user.id,
    });
    return deleteResult.affected > 0;
  }

  async createBuild(id: string, user: User) {
    const application = this.findOne(id, user);
    const fechedUser = this.userService.findCompleteUserById(user.id);

    const payload = await this.deploysRepository.createDeploy(
      await application,
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

    deploy.save();
  }

  async getOneBuild(id: string, user: User) {
    const deploy = await this.deploysRepository.findOne(id);

    if (!deploy) throw new NotFoundException('Deploy não encontrado');

    await this.findOne(deploy.applicationId, user);

    return deploy;
  }

  async getBuilds(id: string, user: User): Promise<ReturList<Deploys>> {
    const { deploys } = await this.findOne(id, user);

    return { items: deploys, total: deploys.length };
  }
}
