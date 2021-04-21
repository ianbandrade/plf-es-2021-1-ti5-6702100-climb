import { IsArray, IsString, MaxLength } from 'class-validator';
import { Enviroment } from '../entities/enviroments.entity';

export class UpdateApplicationDto {
  @MaxLength(50, {
    message: 'O nome da aplicação de ter no máx 50 caracteres',
  })
  @IsString()
  name?: string;

  @IsString()
  repositoryRef?: string;

  @IsString()
  repositoryPath?: string;

  @IsArray()
  environments?: Enviroment[];
}
