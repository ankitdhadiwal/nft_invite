import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  address: string;
}
