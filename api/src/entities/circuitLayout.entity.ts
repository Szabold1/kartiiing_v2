import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';
import { Circuit } from './circuit.entity';

@Entity('circuit_layouts')
@Index(['circuit', 'name'], { unique: true })
export class CircuitLayout {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name?: string;

  @Column()
  length!: number;

  @ManyToOne(() => Circuit, (circuit) => circuit.layouts, {
    onDelete: 'CASCADE',
  })
  circuit!: Circuit;
}
