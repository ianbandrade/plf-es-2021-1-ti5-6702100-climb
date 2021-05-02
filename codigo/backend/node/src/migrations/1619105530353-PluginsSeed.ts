import { getRepository, MigrationInterface } from 'typeorm';
import { PluginsSeed } from '../seeds/plugins.seed';

export class PluginsSeed1619105530353 implements MigrationInterface {
  public async up(): Promise<void> {
    await getRepository('Plugin').save(PluginsSeed);
  }

  public async down(): Promise<void> {
    return;
  }
}
