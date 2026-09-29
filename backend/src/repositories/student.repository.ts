import { AppDataSource } from '../config/data-source.js';
import { Student } from '../entities/student.entity.js';

export class StudentRepository {
  private get repository() {
    return AppDataSource.getRepository(Student);
  }

  async getAll() {
    return await this.repository.find({
      relations: {
        department: true
      }
    });
  }

  async getById(id: number) {
    return await this.repository.findOne({
      where: { id },
      relations: {
        department: true
      }
    });
  }
async updateStudent(
  id: number,
  data: Partial<Student>
) {
  await this.repository.update(id, data);

  return await this.getById(id);
}
  async create(
    name: string,
    email: string,
    age: number,
    departmentId: number,
    enrolledDate: string
  ) {
    const student = this.repository.create({
      name,
      email,
      age,
      department_id: departmentId,
      enrolled_date: new Date(enrolledDate)
    });

    return await this.repository.save(student);
  }

  async deleteStudent(id: number) {
    return await this.repository.delete(id);
  }
}