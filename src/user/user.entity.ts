import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

  constructor(name: string) {
    this.name = name;
    this.role = "member";
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  fullName: string;

  @Column('text')
  role?: string;
}
