import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { PluginsService } from './plugins.service';
import { User } from '../users/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { GetPuglinsDto } from './dto/get-plugins.dto';
import { GetInstances } from './dto/instances/get-instance.dto';
import { CreateInstancesDto } from './dto/instances/create-instances.dto';
import { Instance } from './entities/instance/instance.entity';
import { Role } from 'src/auth/role.decorator';
import { UserRole } from 'src/users/user-roles.enum';
import { CreatePluginDto } from './dto/create-plugin.dto';
import { BasicInstance } from './dto/instances/basic-instance.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { BasicPlugin } from './dto/basic-plugin.dto';

@ApiTags('Plugins')
@Controller('plugins')
@ApiCookieAuth()
@UseGuards(AuthGuard(), RolesGuard)
export class PluginsController {
  constructor(private readonly pluginsService: PluginsService) {}

  @Get()
  async findAll(): Promise<GetPuglinsDto> {
    return await this.pluginsService.findAll();
  }

  @Get(':pluginId/instances')
  async getInstaces(
    @Param('pluginId') pluginId: string,
    @GetUser() user: User,
  ): Promise<GetInstances> {
    return await this.pluginsService.getInstaces(pluginId, user);
  }

  @Get('/instances/:instanceId')
  async getOneInstace(
    @Param('instanceId') instanceId: string,
    @GetUser() user: User,
  ): Promise<BasicInstance> {
    return await this.pluginsService.getOneInstaces(instanceId, user);
  }

  @Post()
  @Role(UserRole.ADMIN)
  async createPuglin(@Body() body: CreatePluginDto): Promise<BasicPlugin> {
    return this.pluginsService.createPlugin(body);
  }

  @Post(':pluginId/instances')
  async createInstance(
    @Param('pluginId') pluginId: string,
    @Body() createIntanceDto: CreateInstancesDto,
    @GetUser() user: User,
  ): Promise<Instance> {
    return await this.pluginsService.createInstance(
      pluginId,
      createIntanceDto,
      user,
    );
  }

  @Delete('/instances/:instanceId')
  async deleteInstance(
    @Param('instanceId') instanceId: string,
    @GetUser() user: User,
  ): Promise<boolean> {
    return await this.pluginsService.deleteInstance(instanceId, user);
  }
}
