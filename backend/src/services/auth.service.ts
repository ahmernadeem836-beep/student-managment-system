import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository.js';

export class AuthService {
  private repository = new UserRepository();

  async authenticate(login: string, password: string) {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET environment variable is required');
    }

    const user = await this.repository.findByLogin(login);

    if (!user || !(await compare(password, user.password_hash))) {
      return null;
    }

    const token = sign(
      {
        sub: user.id,
        username: user.username,
        role: user.role
      },
      secret,
      { expiresIn: '1h' }
    );

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token
    };
  }
}