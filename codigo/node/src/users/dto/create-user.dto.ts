import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export class CreateUserDto {
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
    message: 'User name can not be empty',
  })
  @MaxLength(200, {
    message: 'User name must be less than 200 characters',
  })
  name: string;

  @IsNotEmpty({
    message: 'Password can not be empty',
  })
  @MinLength(6, {
    message: 'Password must be at least 6 characters',
  })
  password: string;

  @IsNotEmpty({
    message: 'Password confirmation can not be empty',
  })
  @MinLength(6, {
    message: 'Password confirmation must be at least 6 characters',
  })
  passwordConfirmation: string;
}
