// import { EntityNotFoundFilter } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule);

  app.enableCors();

  // app.use(helmet());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // app.useGlobalFilters(new EntityNotFoundFilter());

  await app.listen(4001);
}
bootstrap();
