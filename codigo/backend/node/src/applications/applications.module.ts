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
import { MonitoringGRPCService } from './monitoring.grpc.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApplicationRepository,
      DeploysRepository,
      ActivityRepository,
    ]),
    RabbitMQModule.forRootAsync(RabbitMQModule, rabbitMQConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    HttpModule,
    ConfigModule
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, ApplicationsGateway, MonitoringGRPCService],
})
export class ApplicationsModule { }
