import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

export async function bootstrap() {
  // const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    // logger,
  });

  app.use(cookieParser());

  const configService = app.get(ConfigService);

  const swaggerDocumentOptions = new DocumentBuilder()
    .addBearerAuth({ in: 'header', type: 'http' })
    .setTitle('Climb API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerDocumentOptions);
  SwaggerModule.setup('swagger', app, document);

  const port = configService.get('port');
  await app.listen(port);
}

bootstrap();
