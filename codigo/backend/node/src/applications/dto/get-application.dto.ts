import { ProvidersEnum } from 'src/shared/enum/providers.enum';
import { BaseEnvironment } from './environments/basic-environment.dto';

export class GetApplication {
  id: string;
  name: string;
  provider: ProvidersEnum;
  repositoryId: string;
  repositoryRef: string;
  repositoryPath: string;
  repositoryURL: string;
  userId: string;
  environments: BaseEnvironment[];
}
