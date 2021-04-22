import { BaseQueryParametersDto } from 'src/shared/dto/base-query-parameters.dto';
import { DeployStatusEnum } from 'src/shared/enum/application-status.enum';

export class FindDeployQueryDto extends BaseQueryParametersDto {
  status?: DeployStatusEnum;
}
