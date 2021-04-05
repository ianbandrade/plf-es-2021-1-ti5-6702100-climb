import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { encryptionTransformer } from 'src/shared/transformers/encryption.transformer';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
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
