import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

type UserRole = 'admin' | 'teacher' | 'student';

interface AuthenticatedUser {
  id: number;
  username: string;
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.get('authorization');
  const bearerMatch = authorization?.match(/^Bearer\s+(\S+)$/i);

  if (!bearerMatch) {
    return res.status(401).json({
      message: 'Authentication required'
    });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({
      message: 'Authentication configuration error'
    });
  }

  let payload: string | JwtPayload;

  try {
    console.log('JWT secret loaded:', Boolean(secret));
    console.log('JWT token received:', Boolean(bearerMatch[1]));
    console.log('JWT token length:', bearerMatch[1].length);

    payload = verify(bearerMatch[1], secret);

    console.log('JWT verification successful');
  } catch (error) {
    console.error(
      'JWT verification failed:',
      error instanceof Error ? error.message : error
    );

    return res.status(401).json({
      message: 'Invalid or expired token'
    });
  }

  if (typeof payload !== 'object' || payload === null) {
    return res.status(401).json({
      message: 'Invalid or expired token'
    });
  }

  console.log({
    sub: payload.sub,
    username: payload.username,
    role: payload.role
  });

  const id = Number(payload.sub);
  const { username, role } = payload;

  if (
    !Number.isSafeInteger(id) ||
    id <= 0 ||
    typeof username !== 'string' ||
    (role !== 'admin' && role !== 'teacher' && role !== 'student')
  ) {
    return res.status(401).json({
      message: 'Invalid or expired token'
    });
  }

  req.user = {
    id,
    username,
    role
  };

  return next();
}