import { Module } from '@nestjs/common';

import { CoreModule } from '@/core/core.module';
import { MoviesController } from '@/movies/movies.controller';
import { MoviesService } from '@/movies/movies.service';
import { MoviesParser } from '@/movies/parsers';

@Module({
  imports: [CoreModule],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesParser],
  exports: [MoviesService],
})
export class MoviesModule {}
