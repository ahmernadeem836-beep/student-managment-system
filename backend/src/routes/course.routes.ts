import { Router } from 'express';
import { CourseController } from '../controllers/course.controller.js';

const router = Router();
const controller = new CourseController();

router.get('/', controller.getAllCourses);

export default router;