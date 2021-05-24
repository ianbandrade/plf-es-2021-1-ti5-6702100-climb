import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { WinstonModule } from 'nest-winston';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VersionControlModule } from './version-control/version-control.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { typeOrmConfig } from './configuration/configs/typeorm.config';
import { winstonConfig } from './configuration/configs/winston.config';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { ApplicationsModule } from './applications/applications.module';
import { PluginsModule } from './plugins/plugins.module';
import { serveStaticConfig } from './configuration/configs/servestatic.config';

@Module({
  imports: [
    ConfigurationModule,
    ScheduleModule.forRoot(),
    ServeStaticModule.forRootAsync(serveStaticConfig),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    WinstonModule.forRoot(winstonConfig),
    VersionControlModule,
    UsersModule,
    AuthModule,
    ApplicationsModule,
    PluginsModule,
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
