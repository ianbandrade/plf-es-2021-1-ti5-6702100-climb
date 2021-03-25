import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/users.repository';
import { VersionControlController } from './version-control.controller';
import { VersionControlService } from './version-control.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [VersionControlController],
  providers: [VersionControlService],
})
export class VersionControlModule {
}
