import { ApiProperty } from '@nestjs/swagger';
import { BasicInstance } from './basic-instance.dto';

export class GetInstances {
  @ApiProperty()
  instances: BasicInstance[];
}
