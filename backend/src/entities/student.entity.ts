import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Department } from './department.entity.js';
@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  name!: string;

  @Column('varchar')
  email!: string;

  @Column('int')
  age!: number;

  @Column('int')
  department_id!: number;

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'department_id' })
  department!: Department;

  @Column('date')
  enrolled_date!: Date;
}