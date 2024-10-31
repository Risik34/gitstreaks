import { Hono } from 'hono';
import prisma from '../utils/prisma.js';
import { getCookie } from 'hono/cookie';
import jwt from 'jsonwebtoken';

const route = new Hono().basePath('/refresh-token');

const secret = process.env.SECRET;

route.get('/', async c => {
  const token = getCookie(c, 'refreshToken');

  const refreshToken = await prisma.refreshTokens.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!refreshToken || refreshToken.expiresAt < new Date()) {
    return c.json({ message: 'Refresh token invalid or expired.' }, 400);
  }

  const jwtToken = jwt.sign(
    { id: refreshToken.user.id, email: refreshToken.user.email },
    secret,
    {
      expiresIn: '1h',
    }
  );

  return c.json({
    message: 'Jwt token generation successful',
    data: { jwtToken },
  });
});
