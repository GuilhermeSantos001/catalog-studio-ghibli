import { FindAllMovies } from '@/movies/usecases/findAll';
import { MoviePrismaDB } from '@/movies/db/prisma';

import { PrismaService } from '@/core/prisma/prisma.service';

import { LibsService } from '@/core/libs/libs.service';
import { UtilsService } from '@/core/utils/utils.service';

export class FindAllMoviesFactory {
  static async run(
    query: {
      limit?: number;
      offset?: number;
    },
    prismaService: PrismaService,
    libsService: LibsService,
    utilsService: UtilsService,
  ) {
    const database = new MoviePrismaDB(
      libsService,
      utilsService,
      prismaService,
    );

    return await FindAllMovies.execute(
      query,
      database,
      libsService,
      utilsService,
    );
  }
}
