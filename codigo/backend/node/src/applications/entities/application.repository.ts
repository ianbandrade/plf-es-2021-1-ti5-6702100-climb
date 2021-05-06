import { EntityRepository, Repository } from 'typeorm';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { Application } from './application.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4, v4 } from 'uuid';
import { InternalServerErrorException } from '@nestjs/common';
import { ReturList } from 'src/shared/dto/return-list.dto';
import { FindApplicationQueryDto } from '../dto/find-application-query.dto';
import { User } from 'src/users/user.entity';
import { Environment } from './environments/environments.entity';
import { postgresCatch } from 'src/shared/utils/postgres-creation-default-catch';

@EntityRepository(Application)
export class ApplicationRepository extends Repository<Application> {
  async createApplication(
    createApplicationDto: CreateApplicationDto,
    user: User,
  ) {
    const {
      name,
      provider,
      repositoryId,
      repositoryRef,
      repositoryPath: repopsitoryPath,
      repositoryURL,
      repositoryName,
      repositoryOwner,
      environments,
    } = createApplicationDto;

    const application = this.create();

    const mapedEnvironments = environments.map(async ({ key, value }) => {
      const newEviroment = new Environment();
      newEviroment.id = v4();
      newEviroment.key = key;
      newEviroment.value = value;
      return await newEviroment.save();
    });

    application.id = uuidv4();
    application.name = name;
    application.provider = provider;
    application.repositoryId = repositoryId;
    application.repositoryRef = repositoryRef;
    application.repositoryPath = repopsitoryPath;
    application.repositoryURL = repositoryURL;
    application.repositoryOwner = repositoryOwner;
    application.repositoryName = repositoryName;
    application.environments = await Promise.all(mapedEnvironments);
    application.webhookToken = await bcrypt.genSalt();
    application.user = user;

    try {
      await application.save();
      delete application.user;
      delete application.webhookToken;
      return application;
    } catch (e) {
      postgresCatch(e);
    }
  }

  async findAll(
    queryDto: FindApplicationQueryDto,
    user: User,
  ): Promise<ReturList<Application>> {
    queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
    queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;

    const { name, provider } = queryDto;
    const query = this.createQueryBuilder('application');

    query.andWhere('application.userId = :userId', {
      userId: `${user.id}`,
    });

    if (name) {
      query.andWhere('application.name ILIKE :name', { name: `%${name}%` });
    }

    if (provider) {
      query.andWhere('application.provider ILIKE :provider', {
        provider: `%${provider}%`,
      });
    }

    if (queryDto.page && queryDto.limit)
      query.skip((queryDto.page - 1) * queryDto.limit);
    if (queryDto.limit) query.take(+queryDto.limit);
    if (queryDto.sort) query.orderBy(JSON.parse(queryDto.sort));

    query.select(
      Application.publicAttributes.map((userKey) => `application.${userKey}`),
    );

    const [users, total] = await query.getManyAndCount();

    return { items: users, total };
  }
}
