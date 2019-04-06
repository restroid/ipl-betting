import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Match {
  constructor(name: string,team1Id:integer,) {
    this.name = name;
    this.team1Id=
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 500 })
  fullName: string;
}
