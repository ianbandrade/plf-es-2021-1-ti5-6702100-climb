import { UserRole } from "../enum/user-role";

export interface UpdateUser {
  id?:string
  name?:	string
  email?:	string
  role?:	UserRole
  status?:boolean
}