import { AppDataSource } from '../config/data-source.js';
import { Department } from '../entities/department.entity.js';

export class DepartmentRepository {
  private get repository() {
    return AppDataSource.getRepository(Department);
  }

  async getAll() {
    return await this.repository.find();
  }
}