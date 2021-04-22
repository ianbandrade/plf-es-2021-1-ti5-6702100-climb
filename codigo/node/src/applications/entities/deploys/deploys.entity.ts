import { DeployStatusEnum } from 'src/shared/enum/application-status.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Application } from '../application.entity';

@Entity()
export class Deploys extends BaseEntity {
  @Column({ nullable: false, primary: true })
  id: string;

  @ManyToOne(() => Application, (app) => app.deploys)
  @JoinColumn({ name: 'applicationId' })
  application: Application;

  @Column({ nullable: false })
  applicationId: string;

  @Column({ nullable: false, default: DeployStatusEnum.CREATING })
  status: DeployStatusEnum;

  @Column({ nullable: true })
  error: string | null;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
