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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  create(
    @GetUser() user: User,
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    return this.applicationsService.create(createApplicationDto, user);
  }

  @Get()
  async findAll(
    @GetUser() user: User,
    @Query() query: FindApplicationQueryDto,
  ): Promise<ReturList<GetApplication>> {
    return await this.applicationsService.findAll(query, user);
  }

  @Get(':id')
  findOne(@GetUser() user: User, @Param('id') id: string) {
    return this.applicationsService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationsService.update(id, updateApplicationDto, user);
  }

  @Delete(':id')
  remove(@GetUser() user: User, @Param('id') id: string) {
    return this.applicationsService.remove(id, user);
  }

  @Get(':appId/builds')
  getDeploys(@GetUser() user: User, @Param('appId') appId: string) {
    return this.applicationsService.getDeploys(appId, user);
  }

  @Get('builds/:deployId')
  getDeploy(@GetUser() user: User, @Param('deployId') deployId: string) {
    return this.applicationsService.getOneDeploy(deployId, user);
  }

  @Post(':appId/builds')
  createDeploy(@GetUser() user: User, @Param('appId') appId: string) {
    return this.applicationsService.createDeploy(appId, user);
  }
}
