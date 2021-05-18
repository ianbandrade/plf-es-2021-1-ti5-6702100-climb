import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { ReturList } from 'src/shared/dto/return-list.dto';
import { User } from 'src/users/user.entity';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { FindApplicationQueryDto } from './dto/find-application-query.dto';
import { GetApplication } from './dto/get-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@ApiTags('Applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) { }

  @UseGuards(AuthGuard())
  @ApiCookieAuth()
  @Post()
  create(
    @GetUser() user: User,
    @Body(ValidationPipe) createApplicationDto: CreateApplicationDto,
  ) {
    return this.applicationsService.create(createApplicationDto, user);
  }

  @UseGuards(AuthGuard())
  @ApiCookieAuth()
  @Get()
  async findAll(
    @GetUser() user: User,
    @Query() query: FindApplicationQueryDto,
  ): Promise<ReturList<GetApplication>> {
    return await this.applicationsService.findAll(query, user);
  }

  @UseGuards(AuthGuard())
  @ApiCookieAuth()
  @Get(':id')
  findOneId(@GetUser() user: User, @Param('id') id: string) {
    return this.applicationsService.findOnebyId(id, user);
  }

  @Get('name/:appName')
  @ApiCookieAuth()
  findOnebyName(@GetUser() user: User, @Param('appName') name: string) {
    return this.applicationsService.findOnebyName(name, user);
  }

  @UseGuards(AuthGuard())
  @ApiCookieAuth()
  @Patch(':id')
  update(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationsService.update(id, updateApplicationDto, user);
  }

  @UseGuards(AuthGuard())
  @ApiCookieAuth()
  @Delete(':id')
  remove(@GetUser() user: User, @Param('id') id: string) {
    return this.applicationsService.remove(id, user);
  }

  @UseGuards(AuthGuard())
  @ApiCookieAuth()
  @Get(':appId/builds')
  getDeploys(@GetUser() user: User, @Param('appId') appId: string) {
    return this.applicationsService.getDeploys(appId, user);
  }

  @UseGuards(AuthGuard())
  @ApiCookieAuth()
  @Get('builds/:deployId')
  getDeploy(@GetUser() user: User, @Param('deployId') deployId: string) {
    return this.applicationsService.getOneDeploy(deployId, user);
  }

  @Post(':appId/hook')
  reciveWebhook(@Param('appId') appId: string, @Body() body: any) {
    return this.applicationsService.reciveWebhook(appId, body);
  }

  @UseGuards(AuthGuard())
  @ApiCookieAuth()
  @Get(':appId/activities')
  getAppActivities(@GetUser() user: User, @Param('appId') appId: string) {
    return this.applicationsService.getAppActivities(user, appId);
  }

  @UseGuards(AuthGuard())
  @ApiCookieAuth()
  @Post(':appId/rollback')
  doRollback(@GetUser() user: User, @Param('appId') appId: string) {
    return this.applicationsService.doRollBack(user, appId);
  }

  @UseGuards(AuthGuard())
  @ApiCookieAuth()
  @Post(':appId/rollback/cancel')
  undoRollback(@GetUser() user: User, @Param('appId') appId: string) {
    return this.applicationsService.undoRollBack(user, appId);
  }
}
