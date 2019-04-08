import { Column, Entity, PrimaryGeneratedColumn, Double } from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  team1: number;

  @Column()
  team2: number;

  @Column({ length: 100 })
  venue: string;

  @Column()
  date: Date;

  @Column('int')
  winnerTeamId?: number;

  @Column('double')
  winnerRatio: number = 0;
}
