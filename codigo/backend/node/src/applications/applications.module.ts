import { HttpModule, Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationRepository } from './entities/application.repository';
import { PassportModule } from '@nestjs/passport';
import { DeploysRepository } from './entities/deploys/deploys.repository';
import { UsersModule } from 'src/users/users.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rabbitMQConfig } from 'src/configuration/configs/rabbitmq.config';
import { ActivityRepository } from './entities/activities/activity.repository';
import { ApplicationsGateway } from './applications.gateway';
import { MonitoringService } from './monitoring.service';
import { ConfigModule } from '@nestjs/config';
import { InstanceRepository } from 'src/plugins/entities/instance/instance.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApplicationRepository,
      DeploysRepository,
      ActivityRepository,
      InstanceRepository,
    ]),
    RabbitMQModule.forRootAsync(RabbitMQModule, rabbitMQConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    HttpModule,
    ConfigModule,
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, ApplicationsGateway, MonitoringService],
})
export class ApplicationsModule {}
