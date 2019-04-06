import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bet {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  userId: number;

  @Column()
  matchId: number;

  @Column()
  teamId:number;

  @Column()
  amount: number;
}
