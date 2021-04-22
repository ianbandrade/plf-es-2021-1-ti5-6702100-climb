import { DeployStatusEnum } from 'src/shared/enum/application-status.enum';
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
import { Credential } from '../credentials/credentials.entity';
import { Plugin } from '../plugin.entity';

@Entity()
export class Instance extends BaseEntity {
  @Column({ primary: true })
  id: string;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Plugin, (plugin) => plugin.instances)
  @JoinColumn({ name: 'pluginId' })
  plugin: Plugin;

  @Column({ nullable: false })
  pluginId: string;

  @Column({ default: DeployStatusEnum.CREATING })
  status: DeployStatusEnum;

  @OneToMany(() => Credential, (credential) => credential.instance, {
    eager: true,
  })
  @JoinTable()
  credentials: Credential[];

  @ManyToOne(() => User, (user) => user.pluginsInstances)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false })
  userId: string;
}
