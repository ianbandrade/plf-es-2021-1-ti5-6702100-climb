import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { VersionControlService } from './version-control.service';
import { StatePipe } from './pipes/statePipe.pipe';

@ApiTags('Version Control')
@Controller('version-control')
export class VersionControlController {
  constructor(
    private versionControlService: VersionControlService,
  ) {
  }

  @Get('github')
  async github(@Query('code') code: string, @Query('state', new StatePipe()) id: string) {
    await this.versionControlService.github(code, id);

    return {
      message: 'Conta do GitHub associada com sucesso',
    };
  }

  @Get('gitlab')
  async gitlab(@Query('code') code: string, @Query('state', new StatePipe()) id: string) {
    await this.versionControlService.gitlab(code, id);

    return {
      message: 'Conta do GitLab associada com sucesso',
    };
  }
}
