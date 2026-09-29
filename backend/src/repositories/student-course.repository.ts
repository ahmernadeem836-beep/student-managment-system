import { AppDataSource } from '../config/data-source.js';
import { StudentCourse } from '../entities/student-course.entity.js';

export class StudentCourseRepository {

  private get repository() {
    return AppDataSource.getRepository(StudentCourse);
  }

  async assignCourse(studentId: number, courseId: number) {
    const relation = this.repository.create({
      student_id: studentId,
      course_id: courseId
    });

    return await this.repository.save(relation);
  }

  async getCoursesByStudent(studentId: number) {
    return await this.repository.find({
      where: {
        student_id: studentId
      }
    });
  }
}