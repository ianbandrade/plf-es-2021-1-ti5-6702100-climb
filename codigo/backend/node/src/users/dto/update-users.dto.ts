import { UserRole } from '../user-roles.enum';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({
    message: 'Nome do usuário tem que ser uma string',
  })
  name?: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'Insira um email válido',
    },
  )
  email?: string;

  @IsOptional()
  role?: UserRole;

  @IsOptional()
  status?: boolean;
}
