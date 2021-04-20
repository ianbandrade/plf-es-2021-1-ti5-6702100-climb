import { Injectable } from '@nestjs/common';
import { ReturList } from 'src/shared/dto/return-list.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';
import { ApplicationRepository } from './entities/application.repository';

@Injectable()
export class ApplicationsService {
  constructor(private applicationRepository: ApplicationRepository) {}

  create(createApplicationDto: CreateApplicationDto) {
    return this.applicationRepository.createApplication(createApplicationDto);
  }

  async findAll(): Promise<ReturList<Application>> {
    const applications = await this.applicationRepository.find();
    return { items: applications, total: applications.length };
  }

  async findOne(id: number): Promise<Application> {
    return await this.applicationRepository.findOne(id);
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  async remove(id: number): Promise<boolean> {
    const deleteResult = await this.applicationRepository.delete(id);
    return deleteResult.affected > 0;
  }
}
