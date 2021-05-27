import { ProvidersEnum } from 'src/shared/enum/providers.enum';
import { BaseEnvironment } from './environments/basic-environment.dto';

export class GetApplication {
  id: string;
  name: string;
  url: string;
  provider: ProvidersEnum;
  repositoryId: string;
  repositoryRef: string;
  repositoryPath: string;
  repositoryURL: string;
  repositoryOwner: string;
  repositoryName: string;
  userId: string;
  environments: BaseEnvironment[];
}
