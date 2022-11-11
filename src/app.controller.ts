import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('author')
  async author() {
    return await this.appService.author();
  }

  @Get('credits')
  async credits() {
    return await this.appService.credits();
  }
}
