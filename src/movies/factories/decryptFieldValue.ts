import { DecryptFieldValueMovie } from '@/movies/usecases/decryptFieldValue';
import { MoviePrismaDB } from '@/movies/db/prisma';

import { PrismaService } from '@/core/prisma/prisma.service';

import { LibsService } from '@/core/libs/libs.service';
import { UtilsService } from '@/core/utils/utils.service';

export class DecryptFieldValueMovieFactory {
  static async run(
    value: string,
    prismaService: PrismaService,
    libsService: LibsService,
    utilsService: UtilsService,
  ) {
    const database = new MoviePrismaDB(
      libsService,
      utilsService,
      prismaService,
    );

    return await DecryptFieldValueMovie.execute(
      value,
      database,
      libsService,
      utilsService,
    );
  }
}
