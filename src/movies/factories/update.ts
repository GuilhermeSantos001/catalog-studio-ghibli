import { UpdateMovie } from '@/movies/usecases/update';
import { MoviePrismaDB } from '@/movies/db/prisma';
import { UpdateMovieDto } from '@/movies/dto/update';

import { PrismaService } from '@/core/prisma/prisma.service';

import { LibsService } from '@/core/libs/libs.service';
import { UtilsService } from '@/core/utils/utils.service';

export class UpdateMovieFactory {
  static async run(
    id: string,
    newData: UpdateMovieDto,
    prismaService: PrismaService,
    libsService: LibsService,
    utilsService: UtilsService,
  ) {
    const database = new MoviePrismaDB(
      libsService,
      utilsService,
      prismaService,
    );

    return await UpdateMovie.execute(
      id,
      newData,
      database,
      libsService,
      utilsService,
    );
  }
}
