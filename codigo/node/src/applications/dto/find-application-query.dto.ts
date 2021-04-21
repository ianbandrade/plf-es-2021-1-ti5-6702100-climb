import { BaseQueryParametersDto } from 'src/shared/dto/base-query-parameters.dto';
import { ApplicationStatusEnum } from 'src/shared/enum/application-status.enum';
import { ProvidersEnum } from 'src/shared/enum/providers.enum';

export class FindApplicationQueryDto extends BaseQueryParametersDto {
  name?: string;

  provider?: ProvidersEnum;

  status?: ApplicationStatusEnum;
}
