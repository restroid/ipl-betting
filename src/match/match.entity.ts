import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  team1: number;
  
  @Column()
  Bets: string;

  @Column()
  Name: string;

  @Column()
  Winner: string;
  
  @Column()
  team2: number;

  @Column({ length: 100 })
  venue: string;

  @Column()
  date: Date;

  @Column('int')
  winnerTeamId?: number;

  @Column('double')
  winnerRatio?: number = 0;
}
