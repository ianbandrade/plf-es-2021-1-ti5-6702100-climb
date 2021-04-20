import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { ProvidersEnum } from 'src/shared/enum/providers.enum';
import { Enviroments } from 'src/shared/interfaces/enviroments.interface';

export class CreateApplicationDto {
  @IsNotEmpty({
    message: 'Email não pode ser vazio',
  })
  @MaxLength(50, {
    message: 'O email deve ter no máximo 200 caracteres',
  })
  name: string;

  @IsEnum(ProvidersEnum)
  provider: ProvidersEnum;

  @IsNotEmpty({
    message: 'Email não pode ser vazio',
  })
  @IsNumber()
  repositoryId: number;

  @IsNotEmpty({
    message: 'Email não pode ser vazio',
  })
  repositoryRef: string;

  @IsNotEmpty({
    message: 'Email não pode ser vazio',
  })
  repopsitoryPath: string;

  @IsNotEmpty({
    message: 'Email não pode ser vazio',
  })
  repositoryURL: string;

  environments: Enviroments[];
}
