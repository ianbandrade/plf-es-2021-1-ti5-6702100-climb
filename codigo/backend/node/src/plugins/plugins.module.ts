import { Module } from '@nestjs/common';
import { PluginsService } from './plugins.service';
import { PluginsController } from './plugins.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstanceRepository } from './entities/instance/instance.repository';
import { PluginRepository } from './entities/plugin.repository';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rabbitMQConfig } from 'src/configuration/configs/rabbitmq.config';
import { ApplicationRepository } from 'src/applications/entities/application.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InstanceRepository,
      PluginRepository,
      ApplicationRepository,
    ]),
    RabbitMQModule.forRootAsync(RabbitMQModule, rabbitMQConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PluginsController],
  providers: [PluginsService],
})
export class PluginsModule {}
