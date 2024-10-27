import { Hono, Context } from 'hono';
import jwt from 'jsonwebtoken';

interface User {
  id: string;
  email: string;
}

export const authenticateJWT = (c: Context, next: () => void) => {
  const token = c.req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return c.text('Forbidden', 403);
  }

  jwt.verify(token, process.env.SECRET, (err: Error, user: User) => {
    if (err) {
      return c.text('Forbidden', 403);
    }
    c.set('user', user);
    next();
  });
};
