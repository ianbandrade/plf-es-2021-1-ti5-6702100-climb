import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModuleAsyncOptions } from '@nestjs/serve-static';
import { join } from 'path';

export const serveStaticConfig: ServeStaticModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async () => [
    {
      serveRoot: '/static',
      rootPath: join(__dirname, '../../', 'static'),
    },
  ],
  inject: [ConfigService],
};
