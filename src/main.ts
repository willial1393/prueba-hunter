import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      skipUndefinedProperties: false,
    }),
  );
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
