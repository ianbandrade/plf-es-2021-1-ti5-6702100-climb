import { getRepository, MigrationInterface, QueryRunner } from "typeorm";

import { PluginsSeed } from '../seeds/plugins.seed'

export class PluginsSeed1619105530353 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository("Plugin").save(PluginsSeed)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
