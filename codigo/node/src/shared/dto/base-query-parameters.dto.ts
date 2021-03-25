import { ApiPropertyOptional } from '@nestjs/swagger';

export abstract class BaseQueryParametersDto {
  @ApiPropertyOptional()
  sort: string;

  @ApiPropertyOptional()
  page: number;

  @ApiPropertyOptional()
  limit: number;
}
