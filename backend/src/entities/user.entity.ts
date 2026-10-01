import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 50, unique: true })
  username!: string;

  @Column('varchar', { length: 255, unique: true })
  email!: string;

  @Column('varchar', { name: 'password_hash', length: 255 })
  password_hash!: string;

  @Column('varchar', { length: 20 })
  role!: 'admin' | 'teacher' | 'student';

  @Column('int', { name: 'student_id', nullable: true })
  student_id!: number | null;

  @Column('datetime2', { name: 'created_at' })
  created_at!: Date;
}