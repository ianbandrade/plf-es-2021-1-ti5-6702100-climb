import { InternalServerErrorException } from '@nestjs/common';
import { CreateInstancesDto } from 'src/plugins/dto/instances/create-instances.dto';
import { User } from 'src/users/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';
import { Plugin } from '../plugin.entity';
import { Instance } from './instance.entity';

@EntityRepository(Instance)
export class InstanceRepository extends Repository<Instance> {
  async createInstance(
    plugin: Plugin,
    { name }: CreateInstancesDto,
    user: User,
  ): Promise<void> {
    const instance = new Instance();

    instance.id = v4();
    instance.name = name;
    instance.user = user;
    instance.plugin = plugin;

    try {
      instance.save();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
