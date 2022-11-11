import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ProvidersService } from '@/core/providers/providers.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [ProvidersService],
  exports: [ProvidersService],
})
export class ProvidersModule {}
