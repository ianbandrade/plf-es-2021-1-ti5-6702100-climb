import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ maxLength: 200, required: true })
  @IsNotEmpty({
    message: 'Email can not be empty',
  })
  @IsEmail(
    {},
    {
      message: 'Insert a valid emaiml address',
    },
  )
  @MaxLength(200, {
    message: 'Email address must be less than 200 characters',
  })
  email: string;

  @ApiProperty({ maxLength: 200, required: true })
  @IsNotEmpty({
    message: 'User name can not be empty',
  })
  @MaxLength(200, {
    message: 'User name must be less than 200 characters',
  })
  name: string;

  @ApiProperty({ minLength: 6, required: true })
  @IsNotEmpty({
    message: 'Password can not be empty',
  })
  @MinLength(6, {
    message: 'Password must be at least 6 characters',
  })
  password: string;

  @ApiProperty({ minLength: 6, required: true })
  @IsNotEmpty({
    message: 'Password confirmation can not be empty',
  })
  @MinLength(6, {
    message: 'Password confirmation must be at least 6 characters',
  })
  passwordConfirmation: string;
}
