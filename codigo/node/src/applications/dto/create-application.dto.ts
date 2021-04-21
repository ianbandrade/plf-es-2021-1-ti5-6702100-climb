import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { ProvidersEnum } from 'src/shared/enum/providers.enum';
import { Environment } from '../entities/environments/environments.entity';

export class CreateApplicationDto {
  @IsNotEmpty({
    message: 'Nome não pode ser vazio',
  })
  @MaxLength(50, {
    message: 'O nome da aplicação de ter no máx 50 caracteres',
  })
  @IsString()
  name: string;

  @IsNotEmpty({
    message: 'O provedor não pode ser vazio',
  })
  @IsEnum(ProvidersEnum)
  provider: ProvidersEnum;

  @IsNotEmpty({
    message: 'Id do repositório não pode ser vazio',
  })
  @IsNumber()
  repositoryId: number;

  @IsNotEmpty({
    message: 'O nome da branch não pode ser vazio',
  })
  @IsString()
  repositoryRef: string;

  @IsNotEmpty({
    message: 'O diretório não pode ser vazio',
  })
  @IsString()
  repositoryPath: string;

  @IsNotEmpty({
    message: 'A URL do repositório não pode ser vazia',
  })
  @IsString()
  repositoryURL: string;

  @IsArray()
  environments: Environment[];
}
