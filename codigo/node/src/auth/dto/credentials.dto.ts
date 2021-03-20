import { IsNotEmpty, IsEmail, MaxLength, MinLength } from 'class-validator';

export class CredentialsDto {
  @IsNotEmpty({
    message: 'Email can not be empty',
  })
  @IsEmail(
    {},
    {
      message: 'Insert a valid email address',
    },
  )
  @MaxLength(200, {
    message: 'Email address must be less than 200 characters',
  })
  email: string;

  @IsNotEmpty({
    message: 'Password can not be empty',
  })
  @MinLength(6, {
    message: 'Password must be at least 6 characters',
  })
  password: string;
}
