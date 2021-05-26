import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';
import { GitRequest } from './dto/git-request.dto';
import { VersionControlService } from './version-control.service';

@ApiTags('Version Control')
@Controller('version-control')
export class VersionControlController {
  constructor(private versionControlService: VersionControlService) { }

  @Post('github')
  @ApiCookieAuth()
  @UseGuards(AuthGuard())
  async github(
    @GetUser() user: User,
    @Body(ValidationPipe) { code }: GitRequest,
  ) {
    await this.versionControlService.github(user, code);

    return {
      message: 'Conta do GitHub associada com sucesso',
    };
  }

  @Post('gitlab')
  @ApiCookieAuth()
  @UseGuards(AuthGuard())
  async gitlab(
    @GetUser() user: User,
    @Body(ValidationPipe) { code, redirectUrl }: GitRequest,
  ) {
    await this.versionControlService.gitlab(user, code, redirectUrl);

    return {
      message: 'Conta do GitLab associada com sucesso',
    };
  }
}
