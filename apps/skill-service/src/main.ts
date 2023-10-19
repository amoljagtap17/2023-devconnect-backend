import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SkillServiceModule } from './skill-service.module';

async function bootstrap() {
  const app = await NestFactory.create(SkillServiceModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(4002);
}
bootstrap();
