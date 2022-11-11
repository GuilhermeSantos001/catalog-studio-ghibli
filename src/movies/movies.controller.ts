import {
  HttpException,
  HttpStatus,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  UsePipes,
} from '@nestjs/common';

import { JoiValidationPipe } from '@/core/pipes/joi-validation.pipe';

import { ProvidersService } from '@/core/providers/providers.service';
import { MoviesService } from '@/movies/movies.service';

import { CreateMovieDto } from '@/movies/dto/create';
import { CreateMovieSchema } from '@/movies/dto/schemas/create.joi';
import { UpdateMovieDto } from '@/movies/dto/update';
import { UpdateMovieSchema } from '@/movies/dto/schemas/update.joi';

import { MoviesParser } from '@/movies/parsers';

@Controller('api/movies')
export class MoviesController {
  limitDefault: number;

  constructor(
    private readonly providersService: ProvidersService,
    private readonly moviesService: MoviesService,
    private readonly moviesParser: MoviesParser,
  ) {
    this.limitDefault = 200;
  }

  @Post()
  @UsePipes(new JoiValidationPipe(CreateMovieSchema))
  async create(@Body() data: CreateMovieDto) {
    const movie = await this.moviesService.createMovie(data);

    if (movie instanceof Error)
      throw new HttpException(movie.message, HttpStatus.FORBIDDEN);

    return this.moviesParser.toJSON(movie);
  }

  @Get('/ghibli')
  async getGhibliMovies(@Query('limit') limit: number) {
    const movies = await this.providersService
      .ghibliAPI()
      .findMany(limit || this.limitDefault);

    return movies.sort(
      (a, b) => parseInt(b.release_date) - parseInt(a.release_date),
    );
  }

  @Get('/ghibli/save')
  async getGhibliMoviesSave(@Query('limit') limit: number) {
    const movies = await this.providersService
      .ghibliAPI()
      .findMany(limit || this.limitDefault);

    const savedMovies = [];
    const errors = [];

    for (const movie of movies) {
      const savedMovie = await this.moviesService.createMovie({
        title: movie.title,
        original_title: movie.original_title,
        description: movie.description,
        director: movie.director,
        producer: movie.producer,
        release_date: movie.release_date,
        rt_score: movie.rt_score,
      });

      if (savedMovie instanceof Error) {
        errors.push(savedMovie.message);
        continue;
      }

      savedMovies.push(savedMovie);
    }

    return {
      movies: savedMovies
        .sort((a, b) => parseInt(b.release_date) - parseInt(a.release_date))
        .map((movie) => this.moviesParser.toJSON(movie)),
      errors,
    };
  }

  @Delete('/ghibli')
  async getGhibliMoviesDelete() {
    const movies = await this.providersService
      .ghibliAPI()
      .findMany(this.limitDefault);

    const removedMovies = [];
    const errors = [];

    for (const movie of movies) {
      const findMovie = await this.moviesService.findByMovies(
        { title: movie.title },
        'full',
      );

      if (findMovie.length === 0) {
        errors.push(`Movie ${movie.title} not found`);
        continue;
      }

      const removedMovie = await this.moviesService.removeMovie(
        findMovie[0].id,
      );

      if (removedMovie instanceof Error) {
        errors.push(removedMovie.message);
        continue;
      }

      removedMovies.push(removedMovie);
    }

    return {
      deleted: removedMovies.length,
      errors,
    };
  }

  @Get()
  async findAllMovies(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    return (
      await this.moviesService.findAllMovies(
        (limit && parseInt(limit)) || this.limitDefault,
        (offset && parseInt(offset)) || 0,
      )
    )
      .sort((a, b) => parseInt(b.release_date) - parseInt(a.release_date))
      .map((movie) => this.moviesParser.toJSON(movie));
  }

  @Get(':id')
  async findByIdMovie(@Param('id') id: string) {
    const movie = await this.moviesService.findById(id);

    if (movie instanceof Error)
      throw new HttpException(movie.message, HttpStatus.FORBIDDEN);

    return this.moviesParser.toJSON(movie);
  }

  @Patch(':id')
  async updateMovie(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(UpdateMovieSchema))
    data: UpdateMovieDto,
  ) {
    const movie = await this.moviesService.updateMovie(id, data);

    if (movie instanceof Error)
      throw new HttpException(movie.message, HttpStatus.FORBIDDEN);

    return this.moviesParser.toJSON(movie);
  }

  @Delete(':id')
  async removeMovie(@Param('id') id: string) {
    const deleted = await this.moviesService.removeMovie(id);

    if (deleted instanceof Error)
      throw new HttpException(deleted.message, HttpStatus.FORBIDDEN);

    return deleted;
  }
}
