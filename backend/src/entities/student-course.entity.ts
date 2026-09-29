import {
  Column,
  Entity
} from 'typeorm';

@Entity('student_courses')
export class StudentCourse {

  @Column('int', { primary: true })
  student_id!: number;

  @Column('int', { primary: true })
  course_id!: number;
}