import { hash } from 'bcryptjs';
import { AppDataSource } from '../config/data-source.js';
import { User } from '../entities/user.entity.js';

async function resetAdminPassword() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error('ADMIN_PASSWORD environment variable is required');
  }

  await AppDataSource.initialize();

  try {
    const userRepository = AppDataSource.getRepository(User);
    const admin = await userRepository.findOneBy({ username: 'admin' });

    if (!admin) {
      throw new Error('Admin user "admin" does not exist');
    }

    admin.password_hash = await hash(password, 10);
    await userRepository.save(admin);

    console.log('Admin password reset successfully.');
  } finally {
    await AppDataSource.destroy();
  }
}

resetAdminPassword().catch((error: unknown) => {
  if (
    error instanceof Error &&
    (error.message === 'ADMIN_PASSWORD environment variable is required' ||
      error.message === 'Admin user "admin" does not exist')
  ) {
    console.error(error.message);
  } else {
    console.error('Failed to reset admin password.');
  }

  process.exitCode = 1;
});