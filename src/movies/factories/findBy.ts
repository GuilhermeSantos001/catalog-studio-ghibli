import { FindByMovie } from '@/movies/usecases/findBy';
import { MoviePrismaDB } from '@/movies/db/prisma';
import { Movie } from '@/movies/entities';

import { RecursivePartial } from '@/core/common/types/recursive-partial.type';
import { SimilarityFilter as SimilarityFilterTypes } from '@/core/utils/similarityFilter/types';

import { PrismaService } from '@/core/prisma/prisma.service';

import { LibsService } from '@/core/libs/libs.service';
import { UtilsService } from '@/core/utils/utils.service';

export class FindByMovieFactory {
  static async run(
    filter: RecursivePartial<Movie>,
    similarity: SimilarityFilterTypes.SimilarityType,
    prismaService: PrismaService,
    libsService: LibsService,
    utilsService: UtilsService,
  ) {
    const database = new MoviePrismaDB(
      libsService,
      utilsService,
      prismaService,
    );

    return await FindByMovie.execute(
      filter,
      similarity,
      database,
      libsService,
      utilsService,
    );
  }
}
