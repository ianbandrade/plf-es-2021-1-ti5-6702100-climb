import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, Matches } from 'class-validator';
import { ProvidersEnum } from 'src/shared/enum/providers.enum';
import { BaseEnvironment } from '../dto/environments/basic-environment.dto';

export class CreateApplicationDto {
  @Matches(/^[a-z0-9][a-z0-9-]{3,}[a-z0-9]$/)
  @IsNotEmpty({
    message: 'Nome da applicação não pode ser vazio',
  })
  name: string;

  @IsNotEmpty({
    message: 'Provedor da applicação não pode ser vazio',
  })
  @IsEnum(ProvidersEnum)
  provider: ProvidersEnum;

  @IsNotEmpty({
    message: 'Id do repositório da applicação não pode ser vazio',
  })
  repositoryId: string;

  @IsNotEmpty({
    message: 'Branch do repositório da applicação não pode ser vazio',
  })
  repositoryRef: string;

  @IsNotEmpty({
    message: 'Diretório do repositório da applicação não pode ser vazio',
  })
  repositoryPath: string;

  @IsNotEmpty({
    message: 'URL do repositório da applicação não pode ser vazio',
  })
  repositoryURL: string;

  @IsNotEmpty({
    message: 'Dono do repositório da applicação não pode ser vazio',
  })
  repositoryOwner: string;

  @IsNotEmpty({
    message: 'Nome do repositório da applicação não pode ser vazio',
  })
  repositoryName: string;

  @ApiProperty({ type: () => [BaseEnvironment] })
  environments: BaseEnvironment[];
}
