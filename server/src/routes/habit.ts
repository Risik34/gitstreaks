import { Hono } from 'hono';
import prisma from '../utils/prisma.js';
import { authenticateJWT } from '../middleware/authenticateJWT.js';
import customlogger from '../utils/logger.js';

const habit = new Hono().basePath('/habit');

habit.post('/', authenticateJWT, async c => {
  const user = c.get('user');
  customlogger(user);

  const data = await c.req.json();
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
