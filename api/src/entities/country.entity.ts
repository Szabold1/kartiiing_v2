import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
import { Circuit } from './circuit.entity';
import { Driver } from './driver.entity';

@Entity('countries')
@Index(['code'], { unique: true })
export class Country {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, length: 2 })
  code!: string;

  @Column()
  name!: string;

  @OneToMany(() => Circuit, (circuit) => circuit.country)
  circuits!: Circuit[];

  @OneToMany(() => Driver, (driver) => driver.country)
  drivers!: Driver[];
}
