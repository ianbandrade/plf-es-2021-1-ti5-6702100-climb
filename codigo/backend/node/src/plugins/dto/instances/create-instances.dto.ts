import { IsNotEmpty, Matches } from 'class-validator';

export class CreateInstancesDto {
  @Matches(/^[a-z0-9][a-z0-9-]{3,}[a-z0-9]$/, {
    message:
      'Nome da instância deve conter somente letras minusculas, números e hífens que não estejam no começo ou no final e ter no mínimo 5 caracteres',
  })
  @IsNotEmpty({
    message: 'Nome da instância não pode ser vazio',
  })
  name: string;
}
