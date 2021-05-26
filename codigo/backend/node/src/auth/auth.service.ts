import { ConfigService } from '@nestjs/config';
import { CredentialsDto } from './dto/credentials.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { SiginInReturn } from './dto/sign-in-return';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(credentialsDto: CredentialsDto): Promise<SiginInReturn> {
    const user = await this.userRepository.checkCredentials(credentialsDto);

    if (user === null) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    delete user.password;
    delete user.salt;
    delete user.gitHubToken;
    delete user.gitLabToken;
    delete user.createdAt;
    delete user.updatedAt;

    const jwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      gitHubAccount: user.gitHubAccount,
      gitLabAccount: user.gitLabAccount,
    };
    const token = this.jwtService.sign(jwtPayload);
    return { user, cookie: this.getCookieToken(token) };
  }

  getCookieToken(token: string): string {
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${+this.configService.get(
      'jwt.signOptions.expiresIn',
    )}`;
  }

  getCookieForLogOut(): string {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
