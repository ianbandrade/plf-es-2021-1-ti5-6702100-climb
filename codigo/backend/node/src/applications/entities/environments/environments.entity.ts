import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
} from 'typeorm';
import { Application } from '../application.entity';

@Entity()
export class Environment extends BaseEntity {
  @Column({ primary: true, select: false })
  id: string;

  @ManyToOne(() => Application, (app) => app.environments, {
    onDelete: 'CASCADE',
  })
  applicationId: string;

  @Column({ nullable: false })
  key: string;

  @Column({ nullable: false })
  value: string;

  @CreateDateColumn({ select: false })
  createdAt?: Date;
}
