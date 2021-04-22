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
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { FindApplicationQueryDto } from './dto/find-application-query.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@ApiTags('Applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(
    @GetUser() user: User,
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    return this.applicationsService.create(createApplicationDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@GetUser() user: User, @Query() query: FindApplicationQueryDto) {
    return this.applicationsService.findAll(query, user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@GetUser() user: User, @Param('id') id: string) {
    return this.applicationsService.findOne(id, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationsService.update(id, updateApplicationDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@GetUser() user: User, @Param('id') id: string) {
    return this.applicationsService.remove(id, user);
  }

  @Get(':appId/builds')
  @UseGuards(AuthGuard())
  getDeploys(@GetUser() user: User, @Param('appId') appId: string) {
    return this.applicationsService.getDeploys(appId, user);
  }

  @Get('builds/:deployId')
  @UseGuards(AuthGuard())
  getDeploy(@GetUser() user: User, @Param('deployId') deployId: string) {
    return this.applicationsService.getOneDeploy(deployId, user);
  }

  @Post(':appId/builds')
  @UseGuards(AuthGuard())
  createDeploy(@GetUser() user: User, @Param('appId') appId: string) {
    return this.applicationsService.createDeploy(appId, user);
  }
}
