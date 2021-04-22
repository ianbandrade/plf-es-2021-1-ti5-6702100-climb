import { ApiProperty } from '@nestjs/swagger';
import { DeployStatusEnum } from 'src/shared/enum/application-status.enum';
import { BasicCredentials } from '../credentials/basic-credentials.dto';

export class BasicInstance {
  id: string;

  name: string;

  status: DeployStatusEnum;

  @ApiProperty({ type: [BasicCredentials] })
  credentials: BasicCredentials[];
}
