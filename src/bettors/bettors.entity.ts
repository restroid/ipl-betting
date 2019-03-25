import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bettor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  role: string;
}
