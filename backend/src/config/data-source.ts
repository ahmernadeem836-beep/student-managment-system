import 'reflect-metadata';
import { DataSource } from 'typeorm';




export const AppDataSource = new DataSource({
  type: 'mssql',
  host: 'localhost',
  port: 56895,
  username: 'student_app',
  password: 'StudentApp@12345',
  database: 'student_management',
  options: {
    trustServerCertificate: true
  },
  entities: ['src/entities/*.entity.ts'],
  synchronize: false
});