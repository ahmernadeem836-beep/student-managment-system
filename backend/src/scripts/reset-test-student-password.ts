import { hash } from 'bcryptjs';
import { AppDataSource } from '../config/data-source.js';
import { User } from '../entities/user.entity.js';

async function resetTestStudentPassword() {
  const password = process.env.STUDENT_TEST_PASSWORD;

  if (!password) {
    throw new Error('STUDENT_TEST_PASSWORD environment variable is required');
  }

  await AppDataSource.initialize();

  try {
    const userRepository = AppDataSource.getRepository(User);
    const student = await userRepository.findOneBy({ username: 'student7' });

    if (!student) {
      throw new Error('Test student user "student7" does not exist');
    }

    await userRepository.update(
      { id: student.id },
      { password_hash: await hash(password, 10) }
    );

    console.log('Test student password reset successfully.');
  } finally {
    await AppDataSource.destroy();
  }
}

resetTestStudentPassword().catch((error: unknown) => {
  if (
    error instanceof Error &&
    (error.message === 'STUDENT_TEST_PASSWORD environment variable is required' ||
      error.message === 'Test student user "student7" does not exist')
  ) {
    console.error(error.message);
  } else {
    console.error('Failed to reset test student password.');
  }

  process.exitCode = 1;
});