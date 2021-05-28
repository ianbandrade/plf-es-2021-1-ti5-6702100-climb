import { ApiProperty } from '@nestjs/swagger';
import { BaseActivities } from './base-activities.dto';

export class GetActivities {
  @ApiProperty({ type: () => [BaseActivities] })
  activities: BaseActivities[];
}
