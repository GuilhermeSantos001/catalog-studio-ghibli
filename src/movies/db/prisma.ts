import { MovieDatabaseContract } from '@/movies/contracts';
import { LibsService } from '@/core/libs/libs.service';
import { UtilsService } from '@/core/utils/utils.service';
import { Movie } from '@/movies/entities';
import { PrismaService } from '@/core/prisma/prisma.service';

import { SimilarityFilter as SimilarityFilterTypes } from '@/core/utils/similarityFilter/types';

import * as _ from 'lodash';

export class MoviePrismaDB extends MovieDatabaseContract {
  constructor(
    protected readonly libsService: LibsService,
    protected readonly utilsService: UtilsService,
    private readonly prismaService: PrismaService,
  ) {
    super(libsService, utilsService);
  }

  async create(data: Movie): Promise<Movie> {
    return await this.prismaService.movie.create({ data });
  }

  async findAll(limit?: number, offset?: number): Promise<Movie[]> {
    return await this.prismaService.movie.findMany({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string): Promise<Movie | null> {
    return await this.prismaService.movie.findFirst({ where: { id } });
  }

  async findBy(
    filter: Partial<Movie>,
    similarity?: SimilarityFilterTypes.SimilarityType,
  ): Promise<Movie[]> {
    const movies = await this.prismaService.movie.findMany();

    return movies.filter((movie) =>
      this.utilsService
        .similarityFilter()
        .execute<Movie>(filter, movie as Movie, similarity || 'full'),
    ) as Movie[];
  }

  async findTitle(title: string): Promise<Movie | null> {
    return await this.prismaService.movie.findFirst({ where: { title } });
  }

  async findDirector(director: string): Promise<Movie[]> {
    return await this.prismaService.movie.findMany({ where: { director } });
  }

  async findProducer(producer: string): Promise<Movie[]> {
    return await this.prismaService.movie.findMany({ where: { producer } });
  }

  async update(id: string, newData: Movie): Promise<Movie | null> {
    return await this.prismaService.movie.update({
      where: { id },
      data: { ..._.omitBy(newData, _.isNil) },
    });
  }

  async remove(id: string): Promise<boolean> {
    if ((await this.prismaService.movie.count()) <= 0) return false;

    const movie = await this.prismaService.movie.delete({ where: { id } });

    if (!movie) return false;

    return true;
  }
}
