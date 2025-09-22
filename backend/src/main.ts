import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  await app.listen(AppModule.port, '0.0.0.0');

  return app;
}

bootstrap().then((app) => {
  app.getUrl().then((url) => {
    logger.log(`Application is running on: ${url}`);
  });
});
