import { Application } from '../../entities/application.entity';

export class ReqCreateDto {
  id: string;
  token: string;
  commit: string;
  application: Application;
  timestamp: number;
}
