import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { GhibliAPI } from '@/core/providers/ghibliapi';

@Injectable()
export class ProvidersService {
  constructor(private readonly httpService: HttpService) {}

  public ghibliAPI() {
    return new GhibliAPI(this.httpService);
  }
}
