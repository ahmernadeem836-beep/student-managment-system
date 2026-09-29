import { DepartmentRepository } from '../repositories/department.repository.js';

export class DepartmentService {
  private repository = new DepartmentRepository();

  async getAllDepartments() {
    return await this.repository.getAll();
  }
}