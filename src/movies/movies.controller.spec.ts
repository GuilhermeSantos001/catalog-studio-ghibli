import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/core/prisma/prisma.service';
import { Movie } from '@/movies/entities';
import { CoreModule } from '@/core/core.module';
import { MoviesModule } from '@/movies/movies.module';
import { MoviesController } from '@/movies/movies.controller';
import { MoviesService } from '@/movies/movies.service';
import { MoviesParser } from '@/movies/parsers';

import * as _ from 'lodash';

describe('MoviesController', () => {
  let moviesController: MoviesController;

  const movies: Movie[] = [];
  const limitDefault = 10;
  const mockPrisma = {
    movie: {
      create: ({ data }) => {
        movies.push(data);
        return Promise.resolve(data);
      },
      update: ({ where, data }) => {
        const movie = _.find(movies, where);
        _.merge(movie, data);
        return Promise.resolve(movie);
      },
      findMany: ({ take = limitDefault, skip = 0 } = {}) => {
        return Promise.resolve(_.slice(movies, skip, skip + take));
      },
      findFirst: ({ where }) => {
        const movie = _.find(movies, where);
        return Promise.resolve(movie);
      },
      delete: ({ where }) => {
        const movie = _.find(movies, where);
        _.remove(movies, where);
        return Promise.resolve(movie);
      },
      count: () => {
        return Promise.resolve(movies.length);
      },
    },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, MoviesModule],
      controllers: [MoviesController],
      providers: [MoviesService, MoviesParser],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    moviesController = app.get<MoviesController>(MoviesController);
    moviesController.limitDefault = limitDefault;
  });

  describe('movies', () => {
    it('should return movies from Ghibli API', async () => {
      const movies = await moviesController.getGhibliMovies(limitDefault);

      expect(movies.length).toBeGreaterThan(0);
    });

    it('should return movies from Ghibli API and save in database', async () => {
      const response = await moviesController.getGhibliMoviesSave(limitDefault);

      expect(response.movies.length).toBeGreaterThan(0);
      expect(response.errors.length).not.toBeGreaterThan(0);
    });

    it('should return movies from database', async () => {
      const movies = await moviesController.findAllMovies('5', '0');

      expect(movies.length).toBe(5);
    });

    it('should return movies from database with limit and offset', async () => {
      const response = await moviesController.findAllMovies(null, '5');

      expect(response.length).toBe(5);
      expect(response[0].id).not.toBe(movies[0].id);
    });

    it('should return movie by id from database', async () => {
      const movie = await moviesController.findByIdMovie(movies[0].id);

      expect(movie).toBeDefined();
      expect(movie).toHaveProperty('id');
      expect(movie).toHaveProperty('title');
      expect(movie).toHaveProperty('original_title');
      expect(movie).toHaveProperty('description');
      expect(movie).toHaveProperty('director');
      expect(movie).toHaveProperty('producer');
      expect(movie).toHaveProperty('release_date');
      expect(movie).toHaveProperty('rt_score');
      expect(movie).toHaveProperty('createdAt');
      expect(movie).toHaveProperty('updatedAt');
    });

    it('should rename movie', async () => {
      const movie = await moviesController.updateMovie(movies[0].id, {
        title: 'My new title',
      });

      expect(movie).toBeDefined();
      expect(movie.title).toBe('My new title');
    });

    it('should return movie renamed', async () => {
      const movie = await moviesController.findByIdMovie(movies[0].id);

      expect(movie).toBeDefined();
      expect(movie.title).toBe('My new title');
    });

    it('should delete movie', async () => {
      const removed = await moviesController.removeMovie(movies[0].id);

      expect(removed).toBe(true);
      expect(movies.length).not.toBe(limitDefault);
    });

    it('should delete movies from Ghibli API in database', async () => {
      const response = await moviesController.getGhibliMoviesDelete();

      expect(response.deleted).toBe(9);
      expect(response.errors.length).toBe(1);
    });
  });
});
