import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinTable,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Circuit } from './circuit.entity';
import { Championship } from './championship.entity';
import { Category } from './category.entity';
import { RaceEventResult } from './raceEventResult.entity';
import { FastestLap } from './fastestLap.entity';

@Entity('race_events')
@Index(['circuit', 'dateEnd'], { unique: true })
export class RaceEvent {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  roundNumber?: number;

  @Column({ type: 'date' })
  dateStart?: string;

  @Column({ type: 'date' })
  dateEnd?: string;

  @ManyToOne(() => Circuit)
  circuit!: Circuit;

  @ManyToMany(() => Championship, { eager: true })
  @JoinTable({
    name: 'race_event_championships',
    joinColumn: { name: 'raceEventId' },
    inverseJoinColumn: { name: 'championshipId' },
  })
  championships!: Championship[];

  @ManyToMany(() => Category, { eager: true })
  @JoinTable({
    name: 'race_event_categories',
    joinColumn: { name: 'raceEventId' },
    inverseJoinColumn: { name: 'categoryId' },
  })
  categories!: Category[];

  @OneToMany(() => RaceEventResult, (result) => result.raceEvent, {
    cascade: true,
  })
  results!: RaceEventResult[];

  @OneToMany(() => FastestLap, (fastestLap) => fastestLap.raceEvent, {
    cascade: true,
  })
  fastestLaps!: FastestLap[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
