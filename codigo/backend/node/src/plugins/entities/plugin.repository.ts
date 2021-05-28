import { postgresCatch } from 'src/shared/utils/postgres-creation-default-catch';
import { EntityRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreatePluginDto } from '../dto/create-plugin.dto';
import { Plugin } from './plugin.entity';

@EntityRepository(Plugin)
export class PluginRepository extends Repository<Plugin> {
  async createPlugin({
    name,
    description,
    image,
    chart,
  }: CreatePluginDto): Promise<Plugin> {
    const plugins = new Plugin();

    plugins.id = v4();
    plugins.name = name;
    plugins.description = description;
    plugins.image = image;
    plugins.chart = chart;

    try {
      plugins.save();
      return plugins;
    } catch (e) {
      postgresCatch(e);
    }
  }
}
