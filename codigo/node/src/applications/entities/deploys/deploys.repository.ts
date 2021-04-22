import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Deploys } from './deploys.entity';
import { ReqDeployDto } from '../../dto/deploys/req-deploy.dto';
import { v4 } from 'uuid';
import { Application } from '../application.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { ProvidersEnum } from 'src/shared/enum/providers.enum';

@EntityRepository(Deploys)
export class DeploysRepository extends Repository<Deploys> {
  async createDeploy(
    application: Application,
    user: User,
  ): Promise<ReqDeployDto> {
    const deploy = new Deploys();

    deploy.id = v4();
    deploy.application = application;

    try {
      deploy.save();

      switch ((await application).provider) {
        case ProvidersEnum.GITHUB:
          return {
            ...deploy,
            token: user.gitHubToken,
          };
        case ProvidersEnum.GITLAB:
          return {
            ...deploy,
            token: user.gitLabToken,
          };
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
