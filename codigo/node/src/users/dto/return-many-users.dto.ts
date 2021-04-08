import { User } from '../user.entity';
export class ReturnManyUsersDto {
  users: User[];
  total: number;
}
