import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id?: number;
  
  @Column()
  Bets: string;

  @Column()
  Name: string;

  @Column()
  SeriesName: string;

  @Column()
  Winner: string;
  
  @Column({ length: 100 })
  venue: string;

  @Column()
  date: Date;

  @Column('double')
  winnerRatio?: number = 0;
}
