import { StudentRepository } from '../repositories/student.repository.js';
import { StudentCourseRepository } from '../repositories/student-course.repository.js';
import { Student } from '../entities/student.entity.js';

export class StudentService {

  private repository = new StudentRepository();
  private studentCourseRepository = new StudentCourseRepository();

  async getAllStudents() {
    return await this.repository.getAll();
  }

 async getStudentById(id: number) {
  const student = await this.repository.getById(id);

  if (!student) {
    return null;
  }

  const studentCourses =
    await this.studentCourseRepository.getCoursesByStudent(id);

  return {
    ...student,
    courseIds: studentCourses.map(
      course => course.course_id
    )
  };
}
  async createStudent(
    name: string,
    email: string,
    age: number,
    departmentId: number,
    enrolledDate: string,
    courseIds: number[]
  ) {
    const student = await this.repository.create(
      name,
      email,
      age,
      departmentId,
      enrolledDate
    );

    for (const courseId of courseIds) {
      await this.studentCourseRepository.assignCourse(
        student.id,
        courseId
      );
    }

    return student;
  }

  async updateStudent(
    id: number,
    data: Partial<Student>,
    courseIds: number[]
  ) {
    const student = await this.repository.updateStudent(
      id,
      data
    );

    await this.studentCourseRepository.setCoursesForStudent(
      id,
      courseIds
    );

    return student;
  }

  async deleteStudent(id: number) {

    await this.studentCourseRepository.deleteCoursesByStudent(
      id
    );

    return await this.repository.deleteStudent(id);
  }
}