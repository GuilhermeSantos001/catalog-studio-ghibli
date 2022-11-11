import { MovieRepository } from '@/movies/repositories';
import { MovieDatabaseContract } from '@/movies/contracts';
import { CreateMovieDto } from '@/movies/dto/create';

import { LibsService } from '@/core/libs/libs.service';
import { UtilsService } from '@/core/utils/utils.service';

export class CreateMovie {
  static async execute(
    movie: CreateMovieDto,
    database: MovieDatabaseContract,
    libsService: LibsService,
    utilsService: UtilsService,
  ) {
    const repository = new MovieRepository(database, libsService, utilsService);

    return await repository.register({
      ...movie,
      id: database.generateID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
