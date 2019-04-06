import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  team1: number;

  @Column()
  team2: number;

  @Column({ length: 100 })
  venue: string;

  @Column()
  date: Date;
}
