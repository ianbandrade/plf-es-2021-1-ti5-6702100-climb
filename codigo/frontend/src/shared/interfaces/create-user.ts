import { UserRole } from "../enum/user-role";

export interface CreateUser {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
  role: UserRole;
}
