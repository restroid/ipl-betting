import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  userId: number;

  @Column()
  amount: string;

  @Column({ length: 500 })
  mode: string;

  @Column({ length: 500 })
  remark?: string;

  @Column()
  date: Date
}
