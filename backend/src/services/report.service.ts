
import { clickhouse } from '../config/clickhouse.js';

export async function getStudentCourseSummary() {
  const result = await clickhouse.query({
    query: `
      SELECT
        student_id,
        student_name,
        department_name,
        course_id,
        course_name,
        marks_obtained,
        total_marks,
        result_status,
        attendance_percentage
      FROM student_course_summary
      ORDER BY student_name, course_name
      LIMIT 100
    `,
    format: 'JSONEachRow',
  });

  return await result.json();
}
