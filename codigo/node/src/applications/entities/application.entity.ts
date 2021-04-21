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

@Entity()
export class Application extends BaseEntity {
  @Column({ nullable: false, primary: true })
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 10 })
  provider: ProvidersEnum;

  @Column({ nullable: false, type: 'int' })
  repositoryId: number;

  @Column({ nullable: false, type: 'varchar' })
  repositoryRef: string;

  @Column({ nullable: false, type: 'varchar' })
  repositoryPath: string;

  @Column({ nullable: false, type: 'varchar' })
  repositoryURL: string;

  @Column({ nullable: false, type: 'varchar' })
  webhookToken: string;

  @ManyToOne(() => User, (user) => user.applications)
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

  static get publicAttributes(): (keyof Application)[] {
    return [
      'id',
      'name',
      'provider',
      'repositoryId',
      'repositoryPath',
      'repositoryURL',
      'userId',
    ];
  }
}
