import { Request, Response } from 'express';
import { StudentService } from '../services/student.service.js';

function isDuplicateKeyError(error: unknown): boolean {
  if (typeof error !== 'object' || error === null || !('number' in error)) {
    return false;
  }

  return error.number === 2627 || error.number === 2601;
}

export class StudentController {

  private service = new StudentService();

  getCurrentStudent = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: 'Authentication required'
        });
      }

      const result = await this.service.getStudentByUserId(req.user.id);

      if (result.status === 'unlinked') {
        return res.status(404).json({
          message: 'No student record is linked to this user'
        });
      }

      if (result.status === 'not-found') {
        return res.status(404).json({
          message: 'The linked student record was not found'
        });
      }

      return res.json(result.student);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: 'Failed to fetch current student'
      });
    }
  };

  getAllStudents = async (_req: Request, res: Response) => {
    try {
      const students = await this.service.getAllStudents();

      return res.json(students);

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: 'Failed to fetch students'
      });
    }
  };

  getStudentById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        return res.status(400).json({
          message: 'Invalid student ID'
        });
      }

      const student = await this.service.getStudentById(id);

      if (!student) {
        return res.status(404).json({
          message: 'Student not found'
        });
      }

      return res.json(student);

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: 'Failed to fetch student'
      });
    }
  };

  createStudent = async (req: Request, res: Response) => {
    try {
      const {
        name,
        email,
        age,
        departmentId,
        enrolledDate,
        courseIds
      } = req.body;

      if (
        !name ||
        !email ||
        age === undefined ||
        !departmentId ||
        !enrolledDate ||
        !Array.isArray(courseIds)
      ) {
        return res.status(400).json({
          message: 'All student fields are required'
        });
      }

      const student = await this.service.createStudent(
        name,
        email,
        age,
        departmentId,
        enrolledDate,
        courseIds
      );

      return res.status(201).json(student);

    } catch (error: unknown) {
      console.error(error);

      if (isDuplicateKeyError(error)) {
        return res.status(409).json({
          message: 'Email already exists'
        });
      }

      return res.status(500).json({
        message: 'Failed to create student'
      });
    }
  };

  updateStudent = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        return res.status(400).json({
          message: 'Invalid student ID'
        });
      }

      const student = await this.service.getStudentById(id);

      if (!student) {
        return res.status(404).json({
          message: 'Student not found'
        });
      }

      const {
        name,
        email,
        age,
        departmentId,
        courseIds
      } = req.body;

      if (
        !name ||
        !email ||
        age === undefined ||
        !departmentId ||
        !Array.isArray(courseIds)
      ) {
        return res.status(400).json({
          message: 'All student fields are required'
        });
      }

      const updatedStudent = await this.service.updateStudent(
        id,
        {
          name,
          email,
          age,
          department_id: departmentId
        },
        courseIds
      );

      return res.json(updatedStudent);

    } catch (error: unknown) {
      console.error(error);

      if (isDuplicateKeyError(error)) {
        return res.status(409).json({
          message: 'Email already exists'
        });
      }

      return res.status(500).json({
        message: 'Failed to update student'
      });
    }
  };

  deleteStudent = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      await this.service.deleteStudent(id);

      return res.json({
        message: 'Student deleted successfully'
      });

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: 'Failed to delete student'
      });
    }
  };
}