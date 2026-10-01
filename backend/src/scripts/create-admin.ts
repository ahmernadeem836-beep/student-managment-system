import { hash } from 'bcryptjs';
import { AppDataSource } from '../config/data-source.js';
import { User } from '../entities/user.entity.js';

async function createAdmin() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error('ADMIN_PASSWORD environment variable is required');
  }

  await AppDataSource.initialize();

  try {
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({
      where: [
        { username: 'admin' },
        { email: 'admin@example.com' }
      ]
    });

    if (existingUser) {
      console.log('Admin user already exists; no changes made.');
      return;
    }

    const passwordHash = await hash(password, 10);
    const admin = userRepository.create({
      username: 'admin',
      email: 'admin@example.com',
      password_hash: passwordHash,
      role: 'admin',
      student_id: null,
      created_at: new Date()
    });

    await userRepository.save(admin);
    console.log('Admin user created successfully.');
  } finally {
    await AppDataSource.destroy();
  }
}

createAdmin().catch((error) => {
  console.error('Failed to create admin user:', error);
  process.exitCode = 1;
});