import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import prisma from '../utils/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userSchema } from '../schema.js';
const user = new Hono();

const secret = process.env.SECRET;

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

  return c.json({
    message: 'User signup successful',
    data: { email: newUser.email, id: newUser.id },
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

  const token = jwt.sign(
    { id: existingUser.id, email: existingUser.email },
    secret,
    { expiresIn: '1h' }
  );

  return c.json({ message: 'Login successful', token });
});

export default user;
