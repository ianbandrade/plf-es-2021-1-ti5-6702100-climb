import { ProvidersEnum } from 'src/shared/enum/providers.enum';
import { Enviroment } from './enviroments.entity';
import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';

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

  @OneToMany(() => Enviroment, (enviroment) => enviroment.applicationId, {
    eager: true,
  })
  @JoinTable()
  environments: Enviroment[];

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
