import { ReturnManyUsersDto } from './dto/return-many-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ReturnUserDto } from './dto/return-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from './user-roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { CreateManyUsersDto } from './dto/create-many-users.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Role(UserRole.ADMIN)
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createUser(createUserDto);
    return { user };
  }

  @Post('batch')
  @Role(UserRole.ADMIN)
  async createManyUsers(
    @Body(ValidationPipe) createManyUsersDto: CreateManyUsersDto,
  ): Promise<boolean> {
    return await this.usersService.createManyUsers(createManyUsersDto);
  }

  @Get()
  @Role(UserRole.ADMIN)
  async findUsers(
    @Query() query: FindUsersQueryDto,
  ): Promise<ReturnManyUsersDto> {
    return await this.usersService.findUsers(query);
  }

  @Get(':id')
  @Role(UserRole.ADMIN)
  async findUserById(@Param('id') id: string): Promise<ReturnUserDto> {
    const user = await this.usersService.findUserById(id);
    return { user };
  }

  @Patch(':id')
  @Role(UserRole.ADMIN)
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ) {
    return this.usersService.updateUser(updateUserDto, id);
  }

  @Delete(':id')
  @Role(UserRole.ADMIN)
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);

    return {
      message: 'Usuário removido com sucesso',
    };
  }
}
