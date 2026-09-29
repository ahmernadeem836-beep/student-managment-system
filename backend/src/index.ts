import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import courseRoutes from './routes/course.routes.js';
import studentRoutes from './routes/student.routes.js';
import { AppDataSource } from './config/data-source.js';
import departmentRoutes from './routes/department.routes.js';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  name!: string;

  @Column('int')
  department_id!: number;
}
const app = express();
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected with TypeORM');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: 'Student Management API is running'
  });
});

app.use('/api/students', studentRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/courses', courseRoutes);
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
