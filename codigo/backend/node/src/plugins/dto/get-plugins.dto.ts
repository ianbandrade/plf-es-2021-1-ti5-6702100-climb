import { ApiProperty } from '@nestjs/swagger';
import { BasicPlugin } from './basic-plugin.dto';

export class GetPuglinsDto {
  @ApiProperty({ type: [BasicPlugin] })
  plugins: BasicPlugin[];
}
