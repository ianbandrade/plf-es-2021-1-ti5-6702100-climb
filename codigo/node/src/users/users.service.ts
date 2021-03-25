import { UpdateUserDto } from './dto/update-users.dto';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRole } from './user-roles.enum';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { ReturnAllUserDto } from './dto/return-all-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException(
        'A senha de confirmação esta errada',
      );
    } else {
      return this.userRepository.createUser(createUserDto, UserRole.ADMIN);
    }
  }

  async findUsers(queryDto: FindUsersQueryDto): Promise<ReturnAllUserDto> {
    const users = await this.userRepository.findUsers(queryDto);
    return users;
  }

  async findUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId, {
      select: User.publicAttributes,
    });

    if (!user) throw new NotFoundException('Usuário não foi encontrado');

    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string) {
    const result = await this.userRepository.update({ id }, updateUserDto);
    if (result.affected > 0) {
      const user = await this.findUserById(id);
      return user;
    } else {
      throw new NotFoundException('Usuário não foi encontrado');
    }
  }

  async deleteUser(userId: string) {
    const result = await this.userRepository.delete({ id: userId });
    if (result.affected === 0) {
      throw new NotFoundException('Usuário não foi encontrado');
    }
  }
}
