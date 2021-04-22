import { Injectable } from '@nestjs/common';
import { PluginRepository } from './entities/plugin.repository';
import { User } from 'src/users/user.entity';
import { BasicCredentials } from './dto/credentials/basic-credentials.dto';
import { GetPuglinsDto } from './dto/get-plugins.dto';
import { BasicInstance } from './dto/instances/basic-instance.dto';
import { CreateInstancesDto } from './dto/instances/create-instances.dto';
import { GetInstances } from './dto/instances/get-instance.dto';
import { InstanceRepository } from './entities/instance/instance.repository';

@Injectable()
export class PluginsService {
  constructor(
    private instanceRepository: InstanceRepository,
    private pluginRepository: PluginRepository,
  ) {}

  findAll(): GetPuglinsDto {
    return {
      plugins: [
        {
          id: '6e67872f-c459-4f18-2153-41f5ff17947b',
          name: 'redis',
          description: 'Lorem ipsum dolor sit amet',
          image: 'http://climb-project.tk/static/images/plugins/redis.png',
        },
        {
          id: '6e67872f-c459-4f18-2153-41f5ff17947b',
          name: 'postgreSQL',
          description: 'Lorem ipsum dolor sit amet',
          image: 'http://climb-project.tk/static/images/plugins/postgresql.png',
        },
      ],
    };
  }

  async getInstaces(pluginId: string, user: User): Promise<GetInstances> {
    const instances = await this.instanceRepository.find({
      pluginId,
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

  async createInstance(
    pluginId: string,
    createIntanceDto: CreateInstancesDto,
    user: User,
  ): Promise<void> {
    const plugin = this.pluginRepository.findOne(pluginId);
    return await this.instanceRepository.createInstance(
      await plugin,
      createIntanceDto,
      user,
    );
  }

  async deleteInstance(instanceId: string, user: User) {
    const deleteResult = await this.instanceRepository.delete({
      id: instanceId,
      userId: user.id,
    });
    return deleteResult.affected > 0;
  }
}
