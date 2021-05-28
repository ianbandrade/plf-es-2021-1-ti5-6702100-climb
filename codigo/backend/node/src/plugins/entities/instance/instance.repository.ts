import { CreateInstancesDto } from 'src/plugins/dto/instances/create-instances.dto';
import { postgresCatch } from 'src/shared/utils/postgres-creation-default-catch';
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
  ): Promise<Instance> {
    const instance = new Instance();

    instance.id = v4();
    instance.name = name;
    instance.user = user;
    instance.plugin = plugin;

    try {
      instance.save();
      return instance;
    } catch (e) {
      postgresCatch(e);
    }
  }
}
