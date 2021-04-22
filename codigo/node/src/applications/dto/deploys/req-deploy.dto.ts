import { Application } from '../../entities/application.entity';

export class ReqDeployDto {
  id: string;
  token: string;
  application: Application;
}
