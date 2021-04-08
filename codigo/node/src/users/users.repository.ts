import { CredentialsDto } from './../auth/dto/credentials.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import { ReturnManyUsersDto } from './dto/return-many-users.dto';
import { CreateManyUsersDto } from './dto/create-many-users.dto';
import { PostgresError } from 'pg-error-enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUsers(queryDto: FindUsersQueryDto): Promise<ReturnManyUsersDto> {
    queryDto.status = queryDto.status === undefined ? true : queryDto.status;
    queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
    queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;

    const { email, name, status, role } = queryDto;
    const query = this.createQueryBuilder('user');
    query.where('user.status = :status', { status });

    if (email) {
      query.andWhere('user.email ILIKE :email', { email: `%${email}%` });
    }

    if (name) {
      query.andWhere('user.name ILIKE :name', { name: `%${name}%` });
    }

    if (role) {
      query.andWhere('user.role = :role', { role });
    }

    if (queryDto.page && queryDto.limit)
      query.skip((queryDto.page - 1) * queryDto.limit);
    if (queryDto.limit) query.take(+queryDto.limit);
    if (queryDto.sort) query.orderBy(JSON.parse(queryDto.sort));

    query.select(User.publicAttributes.map((userKey) => `user.${userKey}`));

    const [users, total] = await query.getManyAndCount();

    return { users, total };
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, name, password, role } = createUserDto;

    const user = this.create();
    user.email = email;
    user.name = name;
    user.role = role;
    user.status = true;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      delete user.password;
      delete user.salt;
      return user;
    } catch (error) {
      if (error.code.toString() === PostgresError.UNIQUE_VIOLATION) {
        throw new ConflictException('Email já cadastrado');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário na base de dados',
        );
      }
    }
  }

  async createManyUsers(
    createManyUsersDto: CreateManyUsersDto,
  ): Promise<boolean> {
    try {
      await this.createQueryBuilder()
        .insert()
        .values(
          await Promise.all(
            createManyUsersDto.users.map(async (userData) => {
              const { email, name, password, role } = userData;

              const user = {} as User;
              user.email = email;
              user.name = name;
              user.role = role;
              user.status = true;
              user.salt = await bcrypt.genSalt();
              user.password = await this.hashPassword(password, user.salt);
              return user;
            }),
          ),
        )
        .execute();
      return true;
    } catch (e) {
      const { code, message, detail } = e;
      if (code.toString() === PostgresError.NOT_NULL_VIOLATION)
        throw new BadRequestException(message);
      if (code.toString() === PostgresError.UNIQUE_VIOLATION)
        throw new ConflictException(detail, message);
      else throw new InternalServerErrorException(detail, message);
    }
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    const { email, password } = credentialsDto;
    const user = await this.findOne({ email, status: true });

    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
