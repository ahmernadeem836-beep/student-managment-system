import { Request, Response } from 'express';
import { DepartmentService } from '../services/department.service.js';

export class DepartmentController {

  private service = new DepartmentService();

  getAllDepartments = async (_req: Request, res: Response) => {
    try {
      const departments = await this.service.getAllDepartments();

      return res.json(departments);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: 'Failed to fetch departments'
      });
    }
  };
}