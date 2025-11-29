import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { RaceEvent } from './raceEvent.entity';

@Entity('race_event_results')
@Index(['raceEvent', 'category'], { unique: true })
export class RaceEventResult {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  url!: string;

  @ManyToOne(() => RaceEvent, {
    onDelete: 'CASCADE',
  })
  raceEvent!: RaceEvent;

  @ManyToOne(() => Category, { nullable: true })
  category!: Category | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
