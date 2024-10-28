import { createMiddleware } from 'hono/factory';
import jwt from 'jsonwebtoken';

interface User {
  id: string;
  email: string;
}

export const authenticateJWT = createMiddleware(async (c, next: () => void) => {
  const token = c.req.header('Authorization');

  if (!token) {
    return c.text('Forbidden', 403);
  }

  jwt.verify(token, process.env.SECRET, (err: Error, user: User) => {
    if (err) {
      return c.text('Forbidden', 403);
    }
    c.set('user', user);
  });
  await next();
});
