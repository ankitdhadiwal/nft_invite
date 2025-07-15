import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class InviteCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ default: false })
  used: boolean;

  @Column({ nullable: true })
  claimedByWallet: string;
}
