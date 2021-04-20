import { EntityRepository, Repository } from 'typeorm';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { Application } from './application.entity';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Application)
export class ApplicationRepository extends Repository<Application> {
  async createApplication(createApplicationDto: CreateApplicationDto) {
    const {
      name,
      provider,
      repositoryId,
      repositoryRef,
      repopsitoryPath,
      repositoryURL,
      environments,
    } = createApplicationDto;

    const application = this.create();
    application.name = name;
    application.provider = provider;
    application.repositoryId = repositoryId;
    application.repositoryRef = repositoryRef;
    application.repopsitoryPath = repopsitoryPath;
    application.repositoryURL = repositoryURL;
    application.environments = environments;
    application.webhookToken = await bcrypt.genSalt();

    try {
      await application.save();
      return application;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o usuário na base de dados',
      );
    }
  }
}
