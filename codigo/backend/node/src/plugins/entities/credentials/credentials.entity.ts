import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Instance } from '../instance/instance.entity';

@Entity()
export class Credential extends BaseEntity {
  @Column({ primary: true, select: false })
  id: string;

  @Column({ nullable: false })
  key: string;

  @Column({ nullable: false })
  value: string;

  @ManyToOne(() => Instance, (instance) => instance.credentials, {
    onDelete: 'CASCADE',
  })
  instance: Instance;

  @CreateDateColumn({ select: false })
  createdAt?: Date;
}
