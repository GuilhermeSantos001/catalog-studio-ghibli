import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthorizationMiddleware } from '@/core/middlewares/authorization.middleware';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';

import { CoreModule } from '@/core/core.module';
import { MoviesModule } from '@/movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoreModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes('api');
  }
}
