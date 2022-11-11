import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

import { PrismaService } from '@/core/prisma/prisma.service';
import { LibsService } from '@/core/libs/libs.service';
import { UtilsService } from '@/core/utils/utils.service';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly libsService: LibsService,
    private readonly utilsService: UtilsService,
  ) {}

  private async _invalidMasterKey(authorization: string) {
    if (
      this.utilsService
        .stringEx()
        .hash(process.env.MASTER_KEY, 'sha1', 'hex') !== authorization
    )
      return true;

    return false;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers,
      authorization = headers.authorization;

    if (await this._invalidMasterKey(authorization))
      throw new HttpException(
        this.libsService
          .i18n()
          .translate('middlewares.authorization.exception') as string,
        HttpStatus.UNAUTHORIZED,
      );

    next();
  }
}
