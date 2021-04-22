import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationRepository } from './entities/application.repository';
import { PassportModule } from '@nestjs/passport';
import { DeploysRepository } from './entities/deploys/deploys.repository';
import { UsersModule } from 'src/users/users.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rabbitMQConfig } from 'src/configuration/configs/rabbitmq.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationRepository, DeploysRepository]),
    RabbitMQModule.forRootAsync(RabbitMQModule, rabbitMQConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}
