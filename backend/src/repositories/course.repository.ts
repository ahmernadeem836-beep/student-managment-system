import { AppDataSource } from '../config/data-source.js';
import { Course } from '../entities/course.entity.js';

export class CourseRepository {
  private get repository() {
    return AppDataSource.getRepository(Course);
  }

  async getAll() {
    return await this.repository.find();
  }
}