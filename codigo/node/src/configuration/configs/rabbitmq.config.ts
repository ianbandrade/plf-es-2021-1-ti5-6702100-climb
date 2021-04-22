import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const rabbitMQConfig = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<RabbitMQConfig> => {
    const user = configService.get<string>('amqp.user');
    const password = configService.get<string>('amqp.password');
    const protocol = configService.get<string>('amqp.protocol');
    const host = configService.get<string>('amqp.host');
    const port = configService.get<string>('amqp.port');
    const virtualHost = configService.get<string>('amqp.virtualHost');

    return {
      uri: `${protocol}://${user}:${password}@${host}:${port}/${virtualHost}`,
    };
  },
  inject: [ConfigService],
};
