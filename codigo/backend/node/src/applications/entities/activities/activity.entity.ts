import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';
import { Application } from '../application.entity';
import { ActivityType } from '../../../shared/enum/activity-type.enum';

@Entity()
export class Activity extends BaseEntity {
  @Column({ primary: true })
  id: string;

  @Column()
  type: ActivityType;

  @Column()
  commit: string;

  @Column({ nullable: true })
  error: string | null;

  @ManyToOne(() => Application, (app) => app.activities, {
    onDelete: 'CASCADE',
  })
  application: Application;

  static get publicAttributes(): (keyof Activity)[] {
    return ['type', 'commit', 'error'];
  }
}
