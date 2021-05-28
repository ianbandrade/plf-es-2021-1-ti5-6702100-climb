import { IsNotEmpty } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class CreateManyUsersDto {
  @IsNotEmpty()
  users: CreateUserDto[];
}
