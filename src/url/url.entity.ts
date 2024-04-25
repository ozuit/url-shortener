import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shortCode: string;

  @Column()
  shortUrl: string;

  @Column()
  longUrl: string;
}
