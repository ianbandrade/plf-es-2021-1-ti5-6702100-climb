import { ApiProperty } from '@nestjs/swagger';
import { ProvidersEnum } from 'src/shared/enum/providers.enum';
import { BaseEnvironment } from '../dto/environments/basic-environment.dto';

export class CreateApplicationDto {
  name: string;

  provider: ProvidersEnum;

  repositoryId: string;

  repositoryRef: string;

  repositoryPath: string;

  repositoryURL: string;

  @ApiProperty({ type: () => [BaseEnvironment] })
  environments: BaseEnvironment[];
}
