import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReturList } from 'src/shared/dto/return-list.dto';
import { User } from 'src/users/user.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { FindApplicationQueryDto } from './dto/find-application-query.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';
import { ApplicationRepository } from './entities/application.repository';

@Injectable()
export class ApplicationsService {
  constructor(private applicationRepository: ApplicationRepository) {}

  create(createApplicationDto: CreateApplicationDto, user: User) {
    return this.applicationRepository.createApplication(
      createApplicationDto,
      user,
    );
  }

  async findAll(
    query: FindApplicationQueryDto,
    user: User,
  ): Promise<ReturList<Application>> {
    try {
      return await this.applicationRepository.findAll(query, user);
    } catch (e) {
      return e;
    }
  }

  async findOne(id: string, user: User): Promise<Application> {
    const application = await this.applicationRepository.findOne(id);
    if (!application)
      throw new NotFoundException('Aplicação não foi encontrado');
    if (application.userId !== user.id)
      throw new ForbiddenException('Você não tem acesso à essa aplicação');

    return application;
  }

  async update(
    id: string,
    updateApplicationDto: UpdateApplicationDto,
    user: User,
  ) {
    const application = await this.applicationRepository.findOne(id);
    if (!application)
      throw new NotFoundException('Aplicação não foi encontrado');
    if (application.userId !== user.id)
      throw new ForbiddenException('Você não tem acesso à essa aplicação');

    await this.applicationRepository.update({ id }, updateApplicationDto);
    return this.applicationRepository.findOne(id);
  }

  async remove(id: string, user: User): Promise<boolean> {
    const deleteResult = await this.applicationRepository.delete({
      id,
      userId: user.id,
    });
    return deleteResult.affected > 0;
  }
}
