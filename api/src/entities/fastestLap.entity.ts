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
import { Driver } from './driver.entity';
import { Circuit } from './circuit.entity';
import { RaceEvent } from './raceEvent.entity';

@Entity('fastest_laps')
@Index(['circuit', 'category', 'sessionType', 'date'], { unique: true })
export class FastestLap {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('int')
  lapTime!: number;

  @Column({ type: 'date' })
  date!: string;

  @Column()
  sessionType!: string;

  @ManyToOne(() => Driver)
  driver!: Driver;

  @ManyToOne(() => Circuit)
  circuit!: Circuit;

  @ManyToOne(() => Category)
  category!: Category;

  @ManyToOne(() => RaceEvent, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  raceEvent?: RaceEvent;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
