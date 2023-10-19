import { NestFactory } from '@nestjs/core';
import { SkillServiceModule } from './skill-service.module';

async function bootstrap() {
  const app = await NestFactory.create(SkillServiceModule);
  await app.listen(3000);
}
bootstrap();
