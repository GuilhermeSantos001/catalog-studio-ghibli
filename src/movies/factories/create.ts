import { CreateMovie } from '@/movies/usecases/create';
import { MoviePrismaDB } from '@/movies/db/prisma';
import { CreateMovieDto } from '@/movies/dto/create';

import { PrismaService } from '@/core/prisma/prisma.service';

import { LibsService } from '@/core/libs/libs.service';
import { UtilsService } from '@/core/utils/utils.service';

export class CreateMovieFactory {
  static async run(
    movie: CreateMovieDto,
    prismaService: PrismaService,
    libsService: LibsService,
    utilsService: UtilsService,
  ) {
    const database = new MoviePrismaDB(
      libsService,
      utilsService,
      prismaService,
    );

    return await CreateMovie.execute(
      movie,
      database,
      libsService,
      utilsService,
    );
  }
}
