import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  author(): string {
    return '@GuilhermeSantos001';
  }

  credits(): string {
    return 'Catalog Studio Ghibli ©2022 Created by @GuilhermeSantos001';
  }
}
