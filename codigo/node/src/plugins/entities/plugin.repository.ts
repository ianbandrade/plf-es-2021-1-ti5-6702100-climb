import { EntityRepository, Repository } from 'typeorm';
import { Plugin } from './plugin.entity';

@EntityRepository(Plugin)
export class PluginRepository extends Repository<Plugin> {}
