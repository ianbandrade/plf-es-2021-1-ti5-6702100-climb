import {
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
import { CreatePuglinDto } from './dto/create-plugin.dto';
import { Plugin } from './entities/plugin.entity';
import * as dotenv from 'dotenv';
import configuration from 'src/configuration/configuration';

dotenv.config();

const config = configuration();
const { defaultExchange, plugins } = config.amqp;

@Injectable()
export class PluginsService {
  constructor(
    private instanceRepository: InstanceRepository,
    private pluginRepository: PluginRepository,
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

    const instance = await this.instanceRepository.createInstance(
      plugin,
      createIntanceDto,
      user,
    );
    this.sendNewInstance(instance, plugin);
    return instance;
  }

  async deleteInstance(instanceId: string, user: User): Promise<boolean> {
    const deleteResult = await this.instanceRepository.delete({
      id: instanceId,
      userId: user.id,
    });
    return deleteResult.affected > 0;
  }

  sendNewInstance(instance: Instance, plugin: Plugin) {
    const payload: ReqInstanceDto = {
      id: instance.id,
      plugin: {
        name: plugin.name,
        dockerfile: plugin.dockerImage,
      },
    };
    this.amqpConnection.publish('', plugins.deploy.req.routingKey, payload);
  }

  async createPlugiin(
    bcreatePluginnDto: CreatePuglinDto,
  ): Promise<BasicPlugin> {
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
    routingKey: plugins.deploy.res.routingKey,
    queue: plugins.deploy.res.queue,
  })
  async deployResponse({ id, success, credentials }: ResInstanceDto) {
    try {
      const instance = await this.instanceRepository.findOne(id);

      instance.status = success
        ? DeployStatusEnum.SUCCESS
        : DeployStatusEnum.FAIL;

      instance.credentials = this.mapCredentials(credentials, instance.id);

      instance.save();
      return instance;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  private mapCredentials(
    baseCredentials: BasicCredentials[],
    instanceId: string,
  ) {
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
