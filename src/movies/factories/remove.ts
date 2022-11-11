import { RemoveMovie } from '@/movies/usecases/remove';
import { MoviePrismaDB } from '@/movies/db/prisma';

import { PrismaService } from '@/core/prisma/prisma.service';

import { LibsService } from '@/core/libs/libs.service';
import { UtilsService } from '@/core/utils/utils.service';

export class RemoveMovieFactory {
  static async run(
    id: string,
    prismaService: PrismaService,
    libsService: LibsService,
    utilsService: UtilsService,
  ) {
    const database = new MoviePrismaDB(
      libsService,
      utilsService,
      prismaService,
    );

    return await RemoveMovie.execute(id, database, libsService, utilsService);
  }
}
