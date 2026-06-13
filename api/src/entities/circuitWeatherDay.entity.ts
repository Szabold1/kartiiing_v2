import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';
import { Circuit } from './circuit.entity';

@Entity('circuit_weather_days')
@Index(['circuitId', 'date'], { unique: true })
export class CircuitWeatherDay {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  circuitId!: number;

  @ManyToOne(() => Circuit, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'circuitId' })
  circuit!: Circuit;

  @Column({ type: 'date' })
  date!: string;

  @Column()
  condition!: string;

  @Column({ type: 'varchar', nullable: true })
  conditionIcon?: string;

  @Column({ type: 'numeric', precision: 5, scale: 2 })
  tempMin!: number; // Minimum temperature in Celsius

  @Column({ type: 'numeric', precision: 5, scale: 2 })
  tempMax!: number; // Maximum temperature in Celsius

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  tempAvg?: number; // Average temperature in Celsius

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  windSpeed?: number; // Wind speed in km/h

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  windGust?: number; // Wind gust speed in km/h

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  precipitationMm?: number; // Precipitation in millimeters

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fetchedAt!: Date;
}
