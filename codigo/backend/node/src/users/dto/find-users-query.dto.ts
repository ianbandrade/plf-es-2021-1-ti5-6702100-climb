import { BaseQueryParametersDto } from 'src/shared/dto/base-query-parameters.dto';
import { UserRole } from '../user-roles.enum';

export class FindUsersQueryDto extends BaseQueryParametersDto {
  name?: string;

  email?: string;

  status?: boolean;

  role?: UserRole;
}
