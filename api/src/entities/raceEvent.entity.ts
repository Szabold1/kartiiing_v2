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
import { CircuitLayout } from './circuitLayout.entity';
import { Category } from './category.entity';
import { RaceEventResult } from './raceEventResult.entity';
import { FastestLap } from './fastestLap.entity';
import { RaceEventChampionship } from './raceEventChampionship.entity';

@Entity('race_events')
@Index(['circuit', 'dateEnd'], { unique: true })
export class RaceEvent {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  dateStart?: string;

  @Column({ type: 'date' })
  dateEnd?: string;

  @ManyToOne(() => Circuit, { eager: true })
  circuit!: Circuit;

  @ManyToOne(() => CircuitLayout, { eager: true, nullable: true })
  circuitLayout?: CircuitLayout;

  @OneToMany(
    () => RaceEventChampionship,
    (championshipDetail) => championshipDetail.raceEvent,
    { eager: true, cascade: true },
  )
  championshipDetails!: RaceEventChampionship[];

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
