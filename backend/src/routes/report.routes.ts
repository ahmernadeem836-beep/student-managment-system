
import { Router } from 'express';
import { getStudentCourseSummary } from '../services/report.service.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';
const router = Router();


router.get(
  '/student-course-summary',
  authenticateToken,
  authorizeRoles('admin', 'teacher'),
  async (_req, res) => {
    try {
      const data = await getStudentCourseSummary();

      return res.json({
        success: true,
        count: data.length,
        data,
      });
    } catch (error) {
      console.error('Failed to fetch student course summary:', error);

      return res.status(500).json({
        success: false,
        message: 'Failed to fetch student course summary',
      });
    }
  }
);
export default router;