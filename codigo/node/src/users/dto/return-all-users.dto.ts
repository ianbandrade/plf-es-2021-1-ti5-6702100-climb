import { User } from '../user.entity';
export class ReturnAllUserDto {
  users: User[];
  total: number;
}
