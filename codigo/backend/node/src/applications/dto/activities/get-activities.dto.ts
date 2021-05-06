import { ActivityType } from 'src/shared/enum/activity-type.enum';

export class GetActivities {
  activities: {
    type: ActivityType;
    commit: string;
    error: string | null;
  }[];
}
