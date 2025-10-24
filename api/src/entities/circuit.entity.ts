import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';
import { Country } from './country.entity';

@Entity('circuits')
@Index(['nameShort', 'country'], { unique: true })
export class Circuit {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nameShort!: string;

  @Column()
  nameLong!: string;

  @Column()
  length!: number;

  @Column({ nullable: true })
  websiteLink?: string;

  @Column('decimal', { precision: 10, scale: 6 })
  latitude!: number;

  @Column('decimal', { precision: 10, scale: 6 })
  longitude!: number;

  @ManyToOne(() => Country, (country) => country.circuits)
  country!: Country;
}
