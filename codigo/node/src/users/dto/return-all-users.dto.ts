import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

export class ReturnAllUserDto {
  @ApiProperty()
  users: User[];
}
