import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import customlogger from './utils/logger.js';
import dotenv from 'dotenv';
dotenv.config();

import user from './routes/user.js';
import habit from './routes/habit.js';

const app = new Hono().basePath('/api');

app.use(logger(customlogger));

app.route('/', user);
app.route('/', habit);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
