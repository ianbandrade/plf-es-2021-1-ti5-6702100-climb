import { Controller, Post, Body, ValidationPipe, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ReturnUserDto } from './dto/return-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll() {
    return await this.usersService.getAll();
  }

  @Post()
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    console.log("Criando")
    const user = await this.usersService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Administrator registred sucssefuly',
    };
  }
}