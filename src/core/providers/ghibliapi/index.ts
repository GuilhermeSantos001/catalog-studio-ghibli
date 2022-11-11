import { HttpService } from '@nestjs/axios';

import { GhibliAPI as Types } from '@/core/providers/ghibliapi/types';

export class GhibliAPI implements Types.Class {
  axios: HttpService;
  url: string;

  constructor(axios: HttpService) {
    this.axios = axios;
    this.url = process.env.GHIBLI_API_URL;
  }

  async findMany(limit: number): Promise<Types.Movie[]> {
    const $response = await this.axios.axiosRef.get<Types.Movie[]>(
      `${this.url}/films?limit=${limit}`,
    );

    if ($response.status !== 200) return [];

    return $response.data;
  }
}
