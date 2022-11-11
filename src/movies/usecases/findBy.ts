import { MovieRepository } from '@/movies/repositories';
import { MovieDatabaseContract } from '@/movies/contracts';
import { Movie } from '@/movies/entities';

import { RecursivePartial } from '@/core/common/types/recursive-partial.type';
import { SimilarityFilter as SimilarityFilterTypes } from '@/core/utils/similarityFilter/types';

import { LibsService } from '@/core/libs/libs.service';
import { UtilsService } from '@/core/utils/utils.service';

export class FindByMovie {
  static async execute(
    filter: RecursivePartial<Movie>,
    similarity: SimilarityFilterTypes.SimilarityType,
    database: MovieDatabaseContract,
    libsService: LibsService,
    utilsService: UtilsService,
  ) {
    const repository = new MovieRepository(database, libsService, utilsService);

    return await repository.findBy(filter, similarity);
  }
}
