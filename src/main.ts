import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,      
      forbidNonWhitelisted: true, 
      transform: true,      
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalGuards(app.get(ThrottlerGuard));
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
