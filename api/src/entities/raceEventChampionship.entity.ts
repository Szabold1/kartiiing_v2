import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { RaceEvent } from './raceEvent.entity';
import { Championship } from './championship.entity';

@Entity('race_event_championships')
@Index(['raceEvent', 'championship'], { unique: true })
export class RaceEventChampionship {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => RaceEvent, (raceEvent) => raceEvent.championshipDetails)
  @JoinColumn({ name: 'raceEventId' })
  raceEvent!: RaceEvent;

  @ManyToOne(() => Championship, { eager: true })
  @JoinColumn({ name: 'championshipId' })
  championship!: Championship;

  @Column({ nullable: true })
  roundNumber?: number;
}
