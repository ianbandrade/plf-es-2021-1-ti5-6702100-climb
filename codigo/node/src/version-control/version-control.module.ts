import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VersionControlController } from './version-control.controller';
import { VersionControlService } from './version-control.service';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [VersionControlController],
  providers: [VersionControlService],
})
export class VersionControlModule {
}
