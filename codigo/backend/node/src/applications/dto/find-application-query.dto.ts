import { BaseQueryParametersDto } from 'src/shared/dto/base-query-parameters.dto';
import { ProvidersEnum } from 'src/shared/enum/providers.enum';

export class FindApplicationQueryDto extends BaseQueryParametersDto {
  name?: string;

  provider?: ProvidersEnum;
}
