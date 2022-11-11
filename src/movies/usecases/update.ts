import { MovieRepository } from '@/movies/repositories';
import { MovieDatabaseContract } from '@/movies/contracts';
import { UpdateMovieDto } from '@/movies/dto/update';

import { LibsService } from '@/core/libs/libs.service';
import { UtilsService } from '@/core/utils/utils.service';

export class UpdateMovie {
  static async execute(
    id: string,
    newData: UpdateMovieDto,
    database: MovieDatabaseContract,
    libsService: LibsService,
    utilsService: UtilsService,
  ) {
    const repository = new MovieRepository(database, libsService, utilsService);

    return await repository.update(id, {
      ...newData,
      updatedAt: new Date(),
    });
  }
}
