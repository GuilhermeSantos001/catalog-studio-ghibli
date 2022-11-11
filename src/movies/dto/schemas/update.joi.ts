import * as Joi from 'joi';

import { UpdateMovieDto } from '@/movies/dto/update';

export const UpdateMovieSchema = Joi.object<UpdateMovieDto>({
  title: Joi.string().optional(),
  original_title: Joi.string().optional(),
  description: Joi.string().optional(),
  director: Joi.string().optional(),
  producer: Joi.string().optional(),
  release_date: Joi.string().optional(),
  rt_score: Joi.string().optional(),
});
