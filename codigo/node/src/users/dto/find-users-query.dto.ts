import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryParametersDto } from 'src/shared/dto/base-query-parameters.dto';

export class FindUsersQueryDto extends BaseQueryParametersDto {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  status: boolean;

  @ApiPropertyOptional()
  role: string;
}
