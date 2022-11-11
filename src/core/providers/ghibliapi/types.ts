import { HttpService } from '@nestjs/axios';

export declare namespace GhibliAPI {
  export interface Movie {
    title: string;
    original_title: string;
    description: string;
    director: string;
    producer: string;
    release_date: string;
    rt_score: string;
  }

  export interface Class {
    axios: HttpService;
    url: string;
    findMany(limit: number): Promise<Movie[]>;
  }
}
