import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({
    message: 'Email não pode ser vazio',
  })
  @IsEmail(
    {},
    {
      message: 'Insira um email válido',
    },
  )
  @MaxLength(200, {
    message: 'O email deve ter no máximo 200 caracteres',
  })
  email: string;

  @IsNotEmpty({
    message: 'User name can not be empty',
  })
  @MaxLength(200, {
    message: 'User name must be less than 200 characters',
  })
  name: string;

  @IsNotEmpty({
    message: 'A senha não pode ser vazia',
  })
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  password: string;

  @IsNotEmpty({
    message: 'A confirmação de senha não pode ser vazia',
  })
  @MinLength(6, {
    message: 'A confirmação de senha deve ter no mínimo 6 caracteres',
  })
  passwordConfirmation: string;
}
