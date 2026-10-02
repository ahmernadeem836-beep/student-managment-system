import { Router } from 'express';

import { authenticateToken } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';
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
 * /api/students/me:
 *   get:
 *     summary: Get the authenticated student's record
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The authenticated student's record
 *       401:
 *         description: Authentication required or token invalid
 *       403:
 *         description: Access denied for this role
 *       404:
 *         description: No linked student record was found
 */
router.get(
	'/me',
	authenticateToken,
	authorizeRoles('student'),
	controller.getCurrentStudent
);

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 *       401:
 *         description: Authentication required or token invalid
 *       403:
 *         description: Access denied for this role
 *       500:
 *         description: Failed to fetch students
 */
router.get(
	'/',
	authenticateToken,
	authorizeRoles('admin', 'teacher'),
	controller.getAllStudents
);

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Authentication required or token invalid
 *       403:
 *         description: Access denied for this role
 *       500:
 *         description: Failed to fetch student
 */
router.get(
	'/:id',
	authenticateToken,
	authorizeRoles('admin', 'teacher'),
	controller.getStudentById
);

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Authentication required or token invalid
 *       403:
 *         description: Access denied for this role
 *       500:
 *         description: Failed to create student
 */
router.post(
	'/',
	authenticateToken,
	authorizeRoles('admin'),
	controller.createStudent
);

/**
 * @swagger
 * /api/students/{id}:
 *   patch:
 *     summary: Update a student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Authentication required or token invalid
 *       403:
 *         description: Access denied for this role
 *       500:
 *         description: Failed to update student
 */
router.patch(
	'/:id',
	authenticateToken,
	authorizeRoles('admin'),
	controller.updateStudent
);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Authentication required or token invalid
 *       403:
 *         description: Access denied for this role
 *       500:
 *         description: Failed to delete student
 */
router.delete(
	'/:id',
	authenticateToken,
	authorizeRoles('admin'),
	controller.deleteStudent
);

export default router;