import { ApiProperty } from '@nestjs/swagger';
import { Credential } from './credentials';
import { DeployStatusEnum } from 'src/shared/enum/application-status.enum';

export class UpdateInstancesMessageDto {
  id: string;

  success: boolean;

  @ApiProperty({ type: () => [Credential] })
  credentials: Credential[];

  status: DeployStatusEnum;

  error: string | null;
}
