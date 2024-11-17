import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import prisma from '../utils/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userSchema } from '../schema.js';
import { generateRefreshToken } from '../utils/genRefreshToken.js';
import { setCookie, getCookie } from 'hono/cookie';
import dotenv from 'dotenv';
const user = new Hono();

dotenv.config()
const secret = process.env.SECRET

user.post('/signup', zValidator('json', userSchema), async c => {
  const data = c.req.valid('json');

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    return c.json({ message: 'User already exists' }, 409);
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, secret, {
    expiresIn: '1h',
  });

  // Refresh Token implimentatioj
  // const refreshToken = generateRefreshToken();
  // const expiresAt = new Date();
  // expiresAt.setDate(expiresAt.getDate() + 7);
  //
  // const refreshTokenEntry = await prisma.refreshToken.create({
  //   data: {
  //     userId: newUser.id,
  //     token: refreshToken,
  //     expiresAt,
  //   },
  // });
  //
  // setCookie(c, 'refreshToken', refreshToken, {
  //   httpOnly: true,
  //   secure: true,
  //   path: '/',
  // });

  setCookie(c, 'jwtToken', token);

  return c.json({
    message: 'User signup successful',
    email: newUser.email,
    token,
  });
});

user.post('login', async c => {
  const data = await c.req.json();
  console.log(data);

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!existingUser) {
    return c.json({ message: 'User doesnt exist please signup' }, 409);
  }

  const passwordMatch = await bcrypt.compare(
    data.password,
    existingUser.password
  );
  if (!passwordMatch) {
    return c.json({ message: 'Incorrect email password combination' }, 401);
  }

  const refreshToken = generateRefreshToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const refreshTokenEntry = await prisma.refreshToken.create({
    data: {
      userId: existingUser.id,
      token: refreshToken,
      expiresAt,
    },
  });

  setCookie(c, 'refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    path: '/',
  });

  const token = jwt.sign(
    { id: existingUser.id, email: existingUser.email },
    secret,
    { expiresIn: '1h' }
  );

  return c.json({ message: 'Login successful', token });
});

export default user;
