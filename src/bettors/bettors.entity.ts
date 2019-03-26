import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bettor {

  constructor(name: string) {
    this.name = name;
    this.role = "member";
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  role: string;
}
