import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import FastifyMultipart from '@fastify/multipart';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors({ origin: '*' });
  // Register @fastify/multipart plugin
  app.register(FastifyMultipart);
  await app.listen(3000, '0.0.0.0'); // Listen on all interfaces
}
bootstrap();
