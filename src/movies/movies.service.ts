import { Injectable } from '@nestjs/common';

import { Movie } from '@/movies/entities';

import { RecursivePartial } from '@/core/common/types/recursive-partial.type';
import { SimilarityFilter as SimilarityFilterTypes } from '@/core/utils/similarityFilter/types';

import { CreateMovieDto } from '@/movies/dto/create';
import { UpdateMovieDto } from '@/movies/dto/update';

import { CreateMovieFactory } from '@/movies/factories/create';
import { FindAllMoviesFactory } from '@/movies/factories/findAll';
import { FindByMovieFactory } from '@/movies/factories/findBy';
import { FindByIdMovieFactory } from '@/movies/factories/findById';
import { UpdateMovieFactory } from '@/movies/factories/update';
import { DecryptFieldValueMovieFactory } from '@/movies/factories/decryptFieldValue';
import { RemoveMovieFactory } from '@/movies/factories/remove';

import { PrismaService } from '@/core/prisma/prisma.service';
import { LibsService } from '@/core/libs/libs.service';
import { UtilsService } from '@/core/utils/utils.service';

@Injectable()
export class MoviesService {
  constructor(
    public readonly prismaService: PrismaService,
    public readonly libsService: LibsService,
    public readonly utilsService: UtilsService,
  ) {}

  async createMovie(movie: CreateMovieDto) {
    return await CreateMovieFactory.run(
      movie,
      this.prismaService,
      this.libsService,
      this.utilsService,
    );
  }

  async findAllMovies(limit?: number, offset?: number) {
    return await FindAllMoviesFactory.run(
      {
        limit,
        offset,
      },
      this.prismaService,
      this.libsService,
      this.utilsService,
    );
  }

  async findByMovies(
    filter: RecursivePartial<Movie>,
    similarity: SimilarityFilterTypes.SimilarityType,
  ) {
    return await FindByMovieFactory.run(
      filter,
      similarity,
      this.prismaService,
      this.libsService,
      this.utilsService,
    );
  }

  async findById(id: string) {
    return await FindByIdMovieFactory.run(
      id,
      this.prismaService,
      this.libsService,
      this.utilsService,
    );
  }

  async decryptFieldValueMovie(value: string) {
    return await DecryptFieldValueMovieFactory.run(
      value,
      this.prismaService,
      this.libsService,
      this.utilsService,
    );
  }

  async updateMovie(id: string, newData: UpdateMovieDto) {
    return await UpdateMovieFactory.run(
      id,
      newData,
      this.prismaService,
      this.libsService,
      this.utilsService,
    );
  }

  async removeMovie(id: string) {
    return await RemoveMovieFactory.run(
      id,
      this.prismaService,
      this.libsService,
      this.utilsService,
    );
  }
}
