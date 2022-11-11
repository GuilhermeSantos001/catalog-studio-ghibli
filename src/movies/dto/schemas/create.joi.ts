import * as Joi from 'joi';

import { CreateMovieDto } from '@/movies/dto/create';

export const CreateMovieSchema = Joi.object<CreateMovieDto>({
  title: Joi.string().required(),
  original_title: Joi.string().required(),
  description: Joi.string().required(),
  director: Joi.string().required(),
  producer: Joi.string().required(),
  release_date: Joi.string().required(),
  rt_score: Joi.string().required(),
});
