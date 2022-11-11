import { MovieRepository } from '@/movies/repositories';
import { MovieDatabaseContract } from '@/movies/contracts';

import { LibsService } from '@/core/libs/libs.service';
import { UtilsService } from '@/core/utils/utils.service';

export class DecryptFieldValueMovie {
  static async execute(
    value: string,
    database: MovieDatabaseContract,
    libsService: LibsService,
    utilsService: UtilsService,
  ) {
    const repository = new MovieRepository(database, libsService, utilsService);

    return await repository.decryptFieldValue(value);
  }
}
