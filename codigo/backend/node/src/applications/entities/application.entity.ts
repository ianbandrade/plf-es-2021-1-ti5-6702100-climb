import { ProvidersEnum } from 'src/shared/enum/providers.enum';
import { Environment } from './environments/environments.entity';
import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Deploys } from './deploys/deploys.entity';
import { Activity } from './activities/activity.entity';

@Entity()
export class Application extends BaseEntity {
  @Column({ primary: true })
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false })
  provider: ProvidersEnum;

  @Column({ nullable: false })
  repositoryId: string;

  @Column({ nullable: false })
  repositoryRef: string;

  @Column({ nullable: false })
  repositoryPath: string;

  @Column({ nullable: false })
  repositoryURL: string;

  @Column({ nullable: false })
  repositoryName: string;

  @Column({ nullable: false })
  repositoryOwner: string;

  @Column({ nullable: false })
  webhookToken: string;

  @ManyToOne(() => User, (user) => user.applications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false })
  userId: string;

  @OneToMany(() => Environment, (Environment) => Environment.applicationId, {
    eager: true,
  })
  @JoinTable()
  environments: Environment[];

  @OneToMany(() => Deploys, (deploy) => deploy.application, {
    eager: true,
  })
  @JoinTable()
  deploys: Deploys[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Activity, (activity) => activity.application, {
    onDelete: 'CASCADE',
  })
  activities: any;

  static get publicAttributes(): (keyof Application)[] {
    return [
      'id',
      'name',
      'provider',
      'repositoryId',
      'repositoryPath',
      'repositoryURL',
      'repositoryName',
      'repositoryOwner',
      'userId',
    ];
  }
}
