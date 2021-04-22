import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Deploys } from './deploys.entity';
import { ReqDeployDto } from '../../dto/deploys/req-deploy.dto';
import { v4 } from 'uuid';
import { Application } from '../application.entity';
import { InternalServerErrorException } from '@nestjs/common';

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

      return {
        ...deploy,
        token: user.gitHubToken,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
