import { hash } from 'bcryptjs';
import { AppDataSource } from '../config/data-source.js';
import { User } from '../entities/user.entity.js';

async function createTestTeacher() {
  const password = process.env.TEACHER_TEST_PASSWORD;

  if (!password) {
    throw new Error('TEACHER_TEST_PASSWORD environment variable is required');
  }

  await AppDataSource.initialize();

  try {
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({
      where: [
        { username: 'teacher1' },
        { email: 'teacher@test.com' }
      ]
    });

    if (existingUser) {
      console.log('Test teacher user already exists; no changes made.');
      return;
    }

    const teacher = userRepository.create({
      username: 'teacher1',
      email: 'teacher@test.com',
      password_hash: await hash(password, 10),
      role: 'teacher',
      student_id: null,
      created_at: new Date()
    });

    await userRepository.save(teacher);
    console.log('Test teacher user created successfully.');
  } finally {
    await AppDataSource.destroy();
  }
}

createTestTeacher().catch((error: unknown) => {
  console.error('Failed to create test teacher user:', error);
  process.exitCode = 1;
});