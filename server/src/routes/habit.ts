import { Hono } from 'hono';
import prisma from '../utils/prisma.js';
import { authenticateJWT } from '../middleware/authenticateJWT.js';
import customlogger from '../utils/logger.js';
import { zValidator } from '@hono/zod-validator';
import { habitSchema } from '../schema.js';

interface User {
  id: string;
  email: string;
  password: string;
}

const habit = new Hono().basePath('/habit');

habit.post('/', authenticateJWT, zValidator('json', habitSchema), async c => {
  const user = c.get('user') as User;
  customlogger(user);

  const data = c.req.valid('json');
  customlogger(data);

  const habit = await prisma.habit.create({
    data: data,
  });

  const updatedUser = prisma.user.update({
    where: { id: user.id },
    data: {
      habits: {
        connect: {
          id: habit.id,
        },
      },
    },
  });

  return c.json({ message: 'Habit generation successful', data: { habit } });
});

habit.get('/:habitId');
habit.put('/:habitId');
habit.delete('/:habitId');

export default habit;
