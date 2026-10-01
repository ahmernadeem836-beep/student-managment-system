import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';

export class AuthController {
  private service = new AuthService();

  login = async (req: Request, res: Response) => {
    try {
      const { login, password } = req.body ?? {};

      if (
        typeof login !== 'string' ||
        !login ||
        typeof password !== 'string' ||
        !password
      ) {
        return res.status(400).json({
          message: 'Login and password are required'
        });
      }

      const user = await this.service.authenticate(login, password);

      if (!user) {
        return res.status(401).json({
          message: 'Invalid credentials'
        });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: 'Failed to authenticate user'
      });
    }
  };
}