import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('jwt.secret'),
    signOptions: {
      expiresIn: +configService.get<number>('jwt.signOptions.expiresIn'),
    },
  }),
  inject: [ConfigService],
};
