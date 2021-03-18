import { Controller, Get, Query } from '@nestjs/common';

import { VersionControlService } from './version-control.service';

@Controller('version-control')
export class VersionControlController {
  constructor(
    private versionControlService: VersionControlService,
  ) {
  }

  @Get('github')
  async github(@Query('code') code: string, @Query('state') state: string) {
    return this.versionControlService.github(code, state);
  }

  @Get('gitlab')
  async gitlab(@Query('code') code: string, @Query('state') state: string) {
    return this.versionControlService.gitlab(code, state);
  }
}
