import { BasicCredentials } from '../credentials/basic-credentials.dto';

export class ResInstanceDto {
  id: string;
  success: boolean;
  credentials: BasicCredentials[];
}
