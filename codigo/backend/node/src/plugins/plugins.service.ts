import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PluginRepository } from './entities/plugin.repository';
import { User } from 'src/users/user.entity';
import { BasicCredentials } from './dto/credentials/basic-credentials.dto';
import { GetPuglinsDto } from './dto/get-plugins.dto';
import { BasicInstance } from './dto/instances/basic-instance.dto';
import { CreateInstancesDto } from './dto/instances/create-instances.dto';
import { GetInstances } from './dto/instances/get-instance.dto';
import { InstanceRepository } from './entities/instance/instance.repository';
import { BasicPlugin } from './dto/basic-plugin.dto';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Instance } from './entities/instance/instance.entity';
import { ResInstanceDto } from './dto/instances/res-instance.dto';
import { ReqInstanceDto } from './dto/instances/req-instance.dto';
import { DeployStatusEnum } from 'src/shared/enum/application-status.enum';
import { Credential } from './entities/credentials/credentials.entity';
import { v4 } from 'uuid';
import { CreatePluginDto } from './dto/create-plugin.dto';
import { Plugin } from './entities/plugin.entity';
import * as dotenv from 'dotenv';
import configuration from 'src/configuration/configuration';
import { ApplicationRepository } from 'src/applications/entities/application.repository';
import { ResInstanceDeleteDto } from './dto/instances/res-delete.dto';

dotenv.config();

const config = configuration();
const { defaultExchange, plugins } = config.amqp;

@Injectable()
export class PluginsService {
  constructor(
    private instanceRepository: InstanceRepository,
    private pluginRepository: PluginRepository,
    private applicationRepository: ApplicationRepository,
    private amqpConnection: AmqpConnection,
  ) {}

  async findAll(): Promise<GetPuglinsDto> {
    const allPlugins = await this.pluginRepository.find();
    return {
      plugins: allPlugins.map<BasicPlugin>(
        ({ id, name, description, image }) => ({
          description,
          id,
          image,
          name,
        }),
      ),
    };
  }

  async getInstaces(pluginId: string, user: User): Promise<GetInstances> {
    const instances = await this.instanceRepository.find({
      plugin: { id: pluginId },
      userId: user.id,
    });

    const basicInstance = instances.map<BasicInstance>(
      ({ id, status, credentials, name }) => {
        credentials.map<BasicCredentials>(({ key, value }) => ({ key, value }));
        return {
          id,
          credentials,
          name,
          status,
        };
      },
    );

    return { instances: basicInstance };
  }

  async getOneInstaces(instanceId: string, user: User): Promise<BasicInstance> {
    const instance = await this.instanceRepository.findOne(instanceId);

    if (!instance) throw new NotFoundException('Instância não encontrada');

    if (instance.userId !== user.id)
      throw new ForbiddenException('Você não tem acesso à essa instância');

    const { id, name, status, credentials } = instance;
    return { id, name, status, credentials };
  }

  async createInstance(
    pluginId: string,
    createIntanceDto: CreateInstancesDto,
    user: User,
  ): Promise<Instance> {
    const plugin = await this.pluginRepository.findOne(pluginId);
    if (!plugin) throw new NotFoundException('Plugin não encontrado');

    const nameAlreadyUsed =
      !!(await this.instanceRepository.findOne({
        where: { name: createIntanceDto.name },
      })) ||
      !!(await this.applicationRepository.findOne({
        where: { name: createIntanceDto.name },
      }));

    if (nameAlreadyUsed) throw new ConflictException('Nome já utilizado');

    const instance = await this.instanceRepository.createInstance(
      plugin,
      createIntanceDto,
      user,
    );
    this.sendNewInstance(instance, plugin);
    return instance;
  }

  async deleteInstance(instanceId: string, user: User): Promise<boolean> {
    const instance = await this.instanceRepository.findOne(instanceId);

    if (!instance) throw new NotFoundException('Instância não encontrada');

    if (instance.userId !== user.id)
      throw new ForbiddenException('Você não tem acesso à essa instância');

    const payload: ReqInstanceDto = {
      id: instance.id,
      plugin: {
        name: instance.name,
        chart: instance.plugin.chart,
      },
    };
    this.amqpConnection.publish('', plugins.delete.req.routingKey, payload);
    return true;
  }

  sendNewInstance(instance: Instance, plugin: Plugin): void {
    const payload: ReqInstanceDto = {
      id: instance.id,
      plugin: {
        name: instance.name,
        chart: plugin.chart,
      },
    };
    this.amqpConnection.publish('', plugins.create.req.routingKey, payload);
  }

  async createPlugin(bcreatePluginnDto: CreatePluginDto): Promise<BasicPlugin> {
    const {
      id,
      name,
      description,
      image,
    } = await this.pluginRepository.createPlugin(bcreatePluginnDto);
    return { id, name, description, image };
  }

  @RabbitSubscribe({
    exchange: defaultExchange,
    routingKey: plugins.create.res.routingKey,
    queue: plugins.create.res.queue,
  })
  async deployResponse({
    id,
    success,
    credentials,
    url,
  }: ResInstanceDto): Promise<Instance> {
    try {
      const instance = await this.instanceRepository.findOne(id);

      instance.status = success
        ? DeployStatusEnum.SUCCESS
        : DeployStatusEnum.FAIL;

      instance.credentials = this.mapCredentials(credentials, instance.id);
      instance.url = url;

      instance.save();
      return instance;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @RabbitSubscribe({
    exchange: defaultExchange,
    routingKey: plugins.delete.res.routingKey,
    queue: plugins.delete.res.queue,
  })
  async deleteResponse({ id, success }: ResInstanceDeleteDto): Promise<void> {
    if (success) {
      await this.instanceRepository.delete({
        id,
      });
    }
  }

  private mapCredentials(
    baseCredentials: BasicCredentials[],
    instanceId: string,
  ): Credential[] {
    return baseCredentials.map<Credential>(({ key, value }) => {
      const credential = new Credential();

      credential.id = v4();
      credential.key = key;
      credential.value = value;
      credential.instanceId = instanceId;

      try {
        credential.save();
        return credential;
      } catch (e) {
        throw new InternalServerErrorException(e);
      }
    });
  }
}
