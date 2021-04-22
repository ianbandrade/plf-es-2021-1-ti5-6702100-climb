import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Application } from '../application.entity';

@Entity()
export class Environment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Application, (app) => app.environments)
  applicationId: string;

  @Column({ nullable: false })
  key: string;

  @Column({ nullable: false })
  value: string;

  @CreateDateColumn()
  createdAt?: Date;
}
