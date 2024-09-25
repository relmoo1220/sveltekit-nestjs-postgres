import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('uploads')
export class Upload {
  @PrimaryGeneratedColumn()
  id: number; // Unique identifier for each record

  @Column()
  postId: number; // Identifier for the post

  @Column()
  name: string; // Name field

  @Column()
  email: string; // Email field

  @Column('text')
  body: string; // Body text field
}
