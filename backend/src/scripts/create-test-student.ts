import { hash } from 'bcryptjs';
import { AppDataSource } from '../config/data-source.js';
import { User } from '../entities/user.entity.js';

async function createTestStudent() {
  const password = process.env.STUDENT_TEST_PASSWORD;

  if (!password) {
    console.error('STUDENT_TEST_PASSWORD environment variable is required');
    process.exitCode = 1;
    return;
  }

  await AppDataSource.initialize();

  try {
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({
      where: [
        { username: 'student7' },
        { email: 'test@student.com' }
      ]
    });

    if (existingUser) {
      console.log('Test student user already exists; no changes made.');
      return;
    }

    const student = userRepository.create({
      username: 'student7',
      email: 'test@student.com',
      password_hash: await hash(password, 10),
      role: 'student',
      student_id: 7,
      created_at: new Date()
    });

    await userRepository.save(student);
    console.log('Test student user created successfully.');
  } finally {
    await AppDataSource.destroy();
  }
}

createTestStudent().catch((error: unknown) => {
  console.error('Failed to create test student user:', error);
  process.exitCode = 1;
});