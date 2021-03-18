import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from './configuration/configuration.module';
import { typeOrmConfig } from './configuration/configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { VersionControlModule } from './version-control/version-control.module';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UsersModule,
    VersionControlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
