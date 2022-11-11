import { Injectable } from '@nestjs/common';

import { Random } from '@/core/utils/random';
import { StringEx } from '@/core/utils/stringEx';
import { SimilarityFilter } from '@/core/utils/similarityFilter';

@Injectable()
export class UtilsService {
  public random() {
    return new Random();
  }

  public stringEx() {
    return new StringEx();
  }

  public similarityFilter() {
    return new SimilarityFilter();
  }
}
