import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WinstonModule } from 'nest-winston';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VersionControlModule } from './version-control/version-control.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { typeOrmConfig } from './configuration/configs/typeorm.config';
import { winstonConfig } from './configuration/configs/winston.config';
import { LoggerInterceptor } from './interceptors/logger.interceptor';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
    WinstonModule.forRoot(winstonConfig),
    VersionControlModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
