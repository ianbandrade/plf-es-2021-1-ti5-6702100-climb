import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/user.entity';
import { UserRepository } from '../users/users.repository';
import { VaidatePayload } from './dto/vaidate-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  async validate(payload: VaidatePayload): Promise<User> {
    const { id } = payload;
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    delete user.password;
    delete user.salt;
    return user;
  }
}
