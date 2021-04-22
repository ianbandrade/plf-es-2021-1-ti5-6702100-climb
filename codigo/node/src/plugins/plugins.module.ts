import { Module } from '@nestjs/common';
import { PluginsService } from './plugins.service';
import { PluginsController } from './plugins.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstanceRepository } from './entities/instance/instance.repository';
import { PluginRepository } from './entities/plugin.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([InstanceRepository, PluginRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PluginsController],
  providers: [PluginsService],
})
export class PluginsModule {}
