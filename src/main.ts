import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';

import * as cookieParser from 'cookie-parser';

import { PrismaService } from '@/core/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(cookieParser());

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(4000, '0.0.0.0');
}
bootstrap();
