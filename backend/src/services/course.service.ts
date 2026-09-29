import { CourseRepository } from '../repositories/course.repository.js';

export class CourseService {
  private repository = new CourseRepository();

  async getAllCourses() {
    return await this.repository.getAll();
  }
}