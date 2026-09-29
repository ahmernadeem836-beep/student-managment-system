import { Router } from 'express';
import { DepartmentController } from '../controllers/department.controller.js';

const router = Router();
const controller = new DepartmentController();

router.get('/', controller.getAllDepartments);

export default router;