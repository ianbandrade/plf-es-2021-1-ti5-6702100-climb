import { ActivityType } from 'src/shared/enum/activity-type.enum';

export class BaseActivities {
  type: ActivityType;
  commit: string;
  error: string | null;
}
