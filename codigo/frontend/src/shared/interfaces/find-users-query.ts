import { BaseQueryParameters } from './base-query-parameters';
import { UserRole } from '../enum/user-role';

export class FindUsersQuery extends BaseQueryParameters {
  name?: string;
  email?: string;
  status?: boolean;
  role?: UserRole;
}
