import { UpdateUserDto } from './dto/update-users.dto';
import {
  Injectable,
  NotFoundException,
  OnModuleInit,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRole } from './user-roles.enum';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { ConfigService } from '@nestjs/config';
import { CreateManyUsersDto } from './dto/create-many-users.dto';
import { ReturList } from 'src/shared/dto/return-list.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private configService: ConfigService,
  ) {}

  onModuleInit() {
    this.userRepository.find().then((users) => {
      if (users.length === 0) {
        this.createUser({
          email: this.configService.get<string>('admin.email'),
          name: this.configService.get<string>('admin.name'),
          password: this.configService.get<string>('admin.password'),
          passwordConfirmation: this.configService.get<string>(
            'admin.password',
          ),
          role: UserRole.ADMIN,
        });
      }
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException(
        'A senha de confirmação esta errada',
      );
    } else {
      return this.userRepository.createUser(createUserDto);
    }
  }

  async createManyUsers(
    createManyUsersDto: CreateManyUsersDto,
  ): Promise<boolean> {
    return await this.userRepository.createManyUsers(createManyUsersDto);
  }

  async findUsers(queryDto: FindUsersQueryDto): Promise<ReturList<User>> {
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

  async findCompleteUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId);

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
