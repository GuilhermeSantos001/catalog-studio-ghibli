import { Injectable } from '@nestjs/common';
import { Movie } from '@/movies/entities';

@Injectable()
export class MoviesParser {
  toJSON(movie: Movie): Partial<Movie> {
    return {
      id: movie.id,
      title: movie.title,
      original_title: movie.original_title,
      description: movie.description,
      director: movie.director,
      producer: movie.producer,
      release_date: movie.release_date,
      rt_score: movie.rt_score,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    };
  }
}
