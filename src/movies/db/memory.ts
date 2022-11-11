import { MovieDatabaseContract } from '@/movies/contracts';
import { LibsService } from '@/core/libs/libs.service';
import { UtilsService } from '@/core/utils/utils.service';
import { Movie } from '@/movies/entities';

import { SimilarityFilter as SimilarityFilterTypes } from '@/core/utils/similarityFilter/types';

import * as _ from 'lodash';

export class MovieMemoryDB extends MovieDatabaseContract {
  constructor(
    protected readonly libsService: LibsService,
    protected readonly utilsService: UtilsService,
    protected movies: Movie[],
  ) {
    super(libsService, utilsService);
  }

  async create(data: Movie): Promise<Movie | null> {
    this.movies.push(data);

    return data;
  }

  async findAll(limit?: number, offset?: number): Promise<Movie[]> {
    return this.movies.slice(offset || 0, limit || this.movies.length);
  }

  async findOne(id: string): Promise<Movie | null> {
    return this.movies.find((movie) => movie.id === id);
  }

  async findBy(
    filter: Partial<Movie>,
    similarity?: SimilarityFilterTypes.SimilarityType,
  ): Promise<Movie[]> {
    return this.movies.filter((movie) =>
      this.utilsService
        .similarityFilter()
        .execute<Movie>(filter, movie as Movie, similarity || 'full'),
    ) as Movie[];
  }

  async findTitle(title: string): Promise<Movie | null> {
    return this.movies.find((movie) => movie.title === title);
  }

  async findDirector(director: string): Promise<Movie[]> {
    return this.movies.filter((movie) => movie.director === director);
  }

  async findProducer(producer: string): Promise<Movie[]> {
    return this.movies.filter((movie) => movie.producer === producer);
  }

  async update(id: string, newData: Movie): Promise<Movie | null> {
    this.movies = this.movies.map((movie) =>
      movie.id === id ? { ...movie, ..._.omitBy(newData, _.isNil) } : movie,
    );

    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    this.movies = this.movies.filter((movie) => movie.id !== id);

    return true;
  }
}
