import { ReturnAllUserDto } from './dto/return-all-users.dto';
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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FindUsersQueryDto } from './dto/find-users-query.dto';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'Created.', type: ReturnUserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity.' })
  @ApiConflictResponse({ description: 'Conflict.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @ApiBadRequestResponse({ description: 'BadRequest.' })
  @ApiBearerAuth()
  @Role(UserRole.ADMIN)
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createAdminUser(createUserDto);
    return { user };
  }

  @Get()
  @Role(UserRole.ADMIN)
  async findUsers(
    @Query() query: FindUsersQueryDto,
  ): Promise<ReturnAllUserDto> {
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
      message: 'User removed successfully',
    };
  }
}
