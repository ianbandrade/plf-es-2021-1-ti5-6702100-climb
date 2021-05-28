import { Application } from '../../entities/application.entity';

export class ReqUpdateDto {
  id: string;
  commit: string;
  application: Application;
  timestamp: number;
}
