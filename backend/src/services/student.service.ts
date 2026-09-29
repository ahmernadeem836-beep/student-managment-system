
import { StudentRepository } from '../repositories/student.repository.js';
import { Student } from '../entities/student.entity.js';
export class StudentService {

  private repository = new StudentRepository();

  async getAllStudents() {
    return await this.repository.getAll();
  }
  async getStudentById(id: number) {
  return await this.repository.getById(id);
}
async updateStudent(id: number, data: Partial<Student>) {
  return await this.repository.updateStudent(id, data);
}
  

  async createStudent(
    name: string,
    email: string,
    age: number,
    departmentId: number,
    enrolledDate: string
  ) {
    return await this.repository.create(
      name,
      email,
      age,
      departmentId,
      enrolledDate
    );
  }
  
async deleteStudent(id: number) {
  return await this.repository.deleteStudent(id);
}



}


