import { createMiddleware } from 'hono/factory';
import jwt from 'jsonwebtoken';
import customlogger from '../utils/logger.js';
import { promise } from 'zod';
import { resolve } from 'path';

interface User {
  id: string;
  email: string;
}

export const authenticateJWT = createMiddleware(async (c, next) => {
  const token = c.req.header('Authorization');

  if (!token) {
    return c.text('Forbidden', 403);
  }
  try {
    const user = await new Promise<User>((resolve, reject) => {
      jwt.verify(token, process.env.SECRET, async (err: Error, user: User) => {
        if (err) {
          return reject(err);
        }
        resolve(user as User);
      });
    });

    c.set('user', user);
  } catch (err) {
    return c.text('Forbidden', 403);
  }
  await next();
});
