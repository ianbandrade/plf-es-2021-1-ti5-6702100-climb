import { BasicCredentials } from '../credentials/basic-credentials.dto';

export class ResInstanceDto {
  id: string;
  success: boolean;
  error: string | null;
  credentials: BasicCredentials[];
  url: string;
}
