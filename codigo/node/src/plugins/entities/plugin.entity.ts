import { BaseEntity, Column, Entity, OneToMany } from 'typeorm';
import { Instance } from './instance/instance.entity';

@Entity()
export class Plugin extends BaseEntity {
  @Column({ primary: true })
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  image: string;

  @Column({ nullable: false })
  dockerImage: string;

  @OneToMany(() => Instance, (instance) => instance.plugin)
  instances: Instance[];
}
