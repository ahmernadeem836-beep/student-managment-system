import { Router } from 'express';

import { StudentController } from '../controllers/student.controller.js';

const router = Router();

const controller = new StudentController();

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management APIs
 */

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of students
 *       500:
 *         description: Failed to fetch students
 */
router.get('/', controller.getAllStudents);

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student found
 *       400:
 *         description: Invalid student ID
 *       404:
 *         description: Student not found
 *       500:
 *         description: Failed to fetch student
 */
router.get('/:id', controller.getStudentById);

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - age
 *               - departmentId
 *               - enrolledDate
 *               - courseIds
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ahmer
 *               email:
 *                 type: string
 *                 example: ahmer@example.com
 *               age:
 *                 type: integer
 *                 example: 22
 *               departmentId:
 *                 type: integer
 *                 example: 1
 *               enrolledDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-09-08
 *               courseIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Invalid student data
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Failed to create student
 */
router.post('/', controller.createStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   patch:
 *     summary: Update a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - age
 *               - departmentId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ahmer
 *               email:
 *                 type: string
 *                 example: ahmer@example.com
 *               age:
 *                 type: integer
 *                 example: 22
 *               departmentId:
 *                 type: integer
 *                 example: 1
 *               courseIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       400:
 *         description: Invalid student data
 *       404:
 *         description: Student not found
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Failed to update student
 */
router.patch('/:id', controller.updateStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       500:
 *         description: Failed to delete student
 */
router.delete('/:id', controller.deleteStudent);

export default router;