import { Router } from 'express';
import { StudentController } from '../controllers/student.controller.js';

const router = Router();

const controller = new StudentController();
router.get('/', controller.getAllStudents);
router.get('/:id', controller.getStudentById);
router.post('/', controller.createStudent);
router.patch('/:id', controller.updateStudent);
router.delete('/:id', controller.deleteStudent);
export default router;