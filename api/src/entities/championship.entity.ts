import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('championships')
@Index(['nameShort', 'nameSeries'], { unique: true })
export class Championship {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nameShort!: string;

  @Column()
  nameLong!: string;

  @Column()
  nameSeries!: string;

  @Column({ type: 'int', default: 999 })
  order!: number;
}
