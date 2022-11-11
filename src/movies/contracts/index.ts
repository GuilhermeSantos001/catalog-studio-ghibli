import { CoreDatabaseContract } from '@/core/contracts/coreDatabase';
import { LibsService } from '@/core/libs/libs.service';
import { UtilsService } from '@/core/utils/utils.service';
import { Movie } from '@/movies/entities';

export abstract class MovieDatabaseContract extends CoreDatabaseContract<Movie> {
  constructor(
    protected readonly libsService: LibsService,
    protected readonly utilsService: UtilsService,
  ) {
    super(libsService, utilsService);
  }

  abstract findTitle(title: string): Promise<Movie | null>;
  abstract findDirector(director: string): Promise<Movie[]>;
  abstract findProducer(producer: string): Promise<Movie[]>;
}
