import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('categories')
@Index(['engineType', 'name'], { unique: true })
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  engineType!: string;

  @Column()
  name!: string;

  @Column({ type: 'int', default: 999 })
  order!: number;
}
