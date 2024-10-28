import { Hono } from 'hono';
import prisma from '../utils/prisma.js';
import { authenticateJWT } from '../middleware/authenticateJWT.js';
import customlogger from '../utils/logger.js';
import { zValidator } from '@hono/zod-validator';
import { habitEntrySchema, habitSchema } from '../schema.js';

interface User {
  id: string;
  email: string;
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

  const { authorId, ...result } = habit;

  return c.json({ message: 'Habit generation successful', data: { result } });
});

habit.get('/', authenticateJWT, async c => {
  const { id } = c.get('user') as User;

  const habits = await prisma.habit.findMany({
    where: { authorId: id },
  });

  if (!habits) {
    return c.json({ message: 'No habits associated with user' });
  }

  return c.json({
    message: 'All habits associated with the user',
    data: { habits },
    count: habits.length,
  });
});
habit.get('/:habitId', authenticateJWT, async c => {
  const habitId = c.req.param('habitId');

  const { id: authorId } = c.get('user') as User;

  const habit = await prisma.habit.findUnique({
    where: { id: habitId, authorId },
  });

  if (!habit) {
    return c.text('Habit not found', 404);
  }

  return c.json({ data: { habit } });
});

habit.put(
  '/:habitId',
  authenticateJWT,
  zValidator('json', habitSchema),
  async c => {
    const habitId = c.req.param('habitId');

    const { id: authorId } = c.get('user') as User;
    const data = c.req.valid('json');

    try {
      const habit = await prisma.habit.update({
        where: { id: habitId, authorId },
        data,
      });

      return c.json({ message: 'Habit successfully updated', data: { habit } });
    } catch (err) {
      return c.text('Habit not found', 404);
    }
  }
);

habit.delete('/:habitId', authenticateJWT, async c => {
  const habitId = c.req.param('habitid');

  const { id: authorId } = c.get('user') as User;

  try {
    const habit = await prisma.habit.delete({
      where: { id: habitId, authorId },
    });

    return c.json({ message: 'Habit successfully deleted', id: habit.id });
  } catch (err) {
    return c.text('Habit not found', 404);
  }
});

habit.put(
  '/entry/:habitId',
  authenticateJWT,
  zValidator('json', habitEntrySchema),
  async c => {
    const habitId = c.req.param('habitId');

    const { id: authorId } = c.get('user') as User;
    const data = c.req.valid('json');
    try {
      await prisma.habit.findUnique({
        where: { id: habitId, authorId },
      });

      const habitEntry = await prisma.habitEntry.create({
        data,
      });

      prisma.habit.update({
        where: { id: habitId, authorId },
        data: {
          habitEntries: {
            connect: {
              id: habitEntry.id,
            },
          },
        },
      });

      return c.json({
        message: 'Entry added successfully',
        data: { habitEntry },
      });
    } catch (err) {
      return c.text('Habit not found');
    }
  }
);

export default habit;
