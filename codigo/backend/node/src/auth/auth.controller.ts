import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.entity';
import { GetUser } from './get-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) credentiaslsDto: CredentialsDto,
    @Res() response: Response,
  ): Promise<{ token: string }> {
    const { token, cookie } = await this.authService.signIn(credentiaslsDto);
    response.setHeader('Set-Cookie', cookie);
    response.send({ token });
    return { token };
  }

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  getMe(@GetUser() user: User): User {
    return user;
  }

  @UseGuards(AuthGuard())
  @Post('logout')
  async logOut(@Res() response: Response) {
    return response.setHeader(
      'Set-Cookie',
      this.authService.getCookieForLogOut(),
    );
  }
}
