import { IsNotEmpty, IsEmail, MaxLength, MinLength } from 'class-validator';

export class CredentialsDto {
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
    message: 'A senha não pode ser vazia',
  })
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  password: string;
}
