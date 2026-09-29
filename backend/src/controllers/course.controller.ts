import { Request, Response } from 'express';
import { CourseService } from '../services/course.service.js';

export class CourseController {

  private service = new CourseService();

  getAllCourses = async (_req: Request, res: Response) => {
    try {
      const courses = await this.service.getAllCourses();

      return res.json(courses);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: 'Failed to fetch courses'
      });
    }
  };
}