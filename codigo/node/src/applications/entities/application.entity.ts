import { ProvidersEnum } from 'src/shared/enum/providers.enum';
import { Enviroments } from 'src/shared/interfaces/enviroments.interface';
import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
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
  repopsitoryPath: string;

  @Column({ nullable: false, type: 'varchar' })
  repositoryURL: string;

  @Column({ nullable: false, type: 'varchar' })
  webhookToken: string;

  @ManyToOne(() => User, (user) => user.applications)
  user: User;

  environments: Enviroments[];
}
