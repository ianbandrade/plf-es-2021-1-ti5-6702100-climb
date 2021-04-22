import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { encryptionTransformer } from 'src/shared/transformers/encryption.transformer';
import { Application } from 'src/applications/entities/application.entity';
import { Instance } from 'src/plugins/entities/instance/instance.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ nullable: false, primary: true })
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200, unique: true })
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  role: string;

  @Column({ nullable: false, default: true })
  status: boolean;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  salt: string;

  @Column({ nullable: true })
  gitHubAccount?: string;

  @Column({ nullable: true })
  gitLabAccount?: string;

  @Column({ nullable: true, transformer: encryptionTransformer })
  gitHubToken?: string;

  @Column({ nullable: true, transformer: encryptionTransformer })
  gitLabToken?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => Application, (application) => application.user, {
    onDelete: 'CASCADE',
  })
  applications: Application[];

  @ManyToOne(() => Instance, (instance) => instance.user, {
    onDelete: 'CASCADE',
  })
  pluginsInstances: Instance[];

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  static get publicAttributes(): (keyof User)[] {
    return [
      'id',
      'name',
      'email',
      'role',
      'status',
      'gitHubAccount',
      'gitLabAccount',
    ];
  }
}
