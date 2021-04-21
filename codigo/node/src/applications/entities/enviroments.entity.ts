import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Application } from './application.entity';

@Entity()
export class Enviroment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Application, (app) => app.environments)
  applicationId: string;

  @Column({ nullable: false })
  key: string;

  @Column({ nullable: false })
  value: string;
}
