import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('database.host'),
    port: configService.get<number>('database.port'),
    database: configService.get<string>('database.name'),
    username: configService.get<string>('database.username'),
    password: configService.get<string>('database.password'),
    entities: [__dirname + '/../../**/*.entity.{js,ts}'],
    synchronize: configService.get<string>('env') === 'development',
  }),
  inject: [ConfigService],
};
