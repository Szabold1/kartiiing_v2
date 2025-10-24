import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';
import { Country } from './country.entity';

@Entity('drivers')
@Index(['firstName', 'lastName', 'country'], { unique: true })
export class Driver {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @ManyToOne(() => Country, (country) => country.drivers)
  country!: Country;
}
