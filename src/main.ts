import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { swaggerConfig } from '@config/swagger/swaggerConfig';

import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  //app.setGlobalPrefix('');
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'X-Version',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'UPDATE', 'OPTIONS'],
    credentials: true,
  });
  await swaggerConfig(app, []);
  const port = process.env.PORT || 3000;
  await app
    .listen(port, '::')
    .then(() => console.log(`Application listening on port ${port}`));
}

bootstrap();
