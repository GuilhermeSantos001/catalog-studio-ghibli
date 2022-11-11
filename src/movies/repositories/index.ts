import { MovieDatabaseContract } from '@/movies/contracts';
import { RepositoryContract } from '@/core/contracts/coreRepository';
import { Movie } from '@/movies/entities';

import { RecursivePartial } from '@/core/common/types/recursive-partial.type';
import { SimilarityFilter as SimilarityFilterTypes } from '@/core/utils/similarityFilter/types';

export class MovieRepository extends RepositoryContract<
  Movie,
  MovieDatabaseContract
> {
  public async beforeSave(model: Movie): Promise<Movie> {
    return model;
  }

  public async beforeUpdate(
    beforeData: Movie,
    nextData: Partial<Movie>,
  ): Promise<Movie> {
    return {
      ...beforeData,
      ...nextData,
    };
  }

  public async decryptFieldValue(value: string): Promise<string> {
    return this.database.decrypt(value);
  }

  public async register(model: Movie): Promise<Movie | Error> {
    const movie = await this.database.findTitle(model.title);

    if (movie)
      return new Error(
        this.libsService
          .i18n()
          .translate('movies.movie_already_exists', model.title) as string,
      );

    return await this.database.create(await this.beforeSave(model));
  }

  public async findMany(limit?: number, offset?: number): Promise<Movie[]> {
    return await this.database.findAll(limit, offset);
  }

  public async findBy(
    filter: RecursivePartial<Movie>,
    similarity?: SimilarityFilterTypes.SimilarityType,
  ): Promise<Movie[]> {
    return await this.database.findBy(filter, similarity);
  }

  public async findById(id: string): Promise<Movie | Error> {
    const movie = await this.database.findOne(id);

    if (!movie)
      return new Error(
        this.libsService
          .i18n()
          .translate('movies.movie_not_found', id) as string,
      );

    return movie;
  }

  public async update(
    id: string,
    newData: Partial<Movie>,
  ): Promise<Movie | Error> {
    const movie = await this.database.findOne(id);

    if (!movie)
      return new Error(
        this.libsService
          .i18n()
          .translate('movies.movie_not_found', id) as string,
      );

    if (await this.database.findTitle(newData.title))
      return new Error(
        this.libsService
          .i18n()
          .translate('movies.movie_already_exists', newData.title) as string,
      );

    return await this.database.update(
      id,
      await this.beforeUpdate(movie, newData),
    );
  }

  public async remove(id: string): Promise<boolean | Error> {
    const movie = await this.database.findOne(id);

    if (!movie)
      return new Error(
        this.libsService
          .i18n()
          .translate('movies.movie_not_found', id) as string,
      );

    return await this.database.remove(id);
  }
}
