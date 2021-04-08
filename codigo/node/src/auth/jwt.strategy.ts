import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../users/users.repository';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/user.entity';
import { Request } from 'express';

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

  async validate(payload: { id: number }) {
    const { id } = payload;
    const user = await this.userRepository.findOne(id, {
      select: User.publicAttributes,
    });
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return user;
  }
}
