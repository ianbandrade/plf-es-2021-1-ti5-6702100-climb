import { ApiProperty } from '@nestjs/swagger';
import { BaseEnvironment } from '../dto/environments/basic-environment.dto';

export class UpdateApplicationDto {
  repositoryRef?: string;

  repositoryPath?: string;

  @ApiProperty({ type: () => [BaseEnvironment] })
  environments?: BaseEnvironment[];
}
