import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import customlogger from './utils/logger.js';
import dotenv from 'dotenv';
import { cors } from 'hono/cors';

import user from './routes/user.js';
import habit from './routes/habit.js';

dotenv.config();

const app = new Hono().basePath('/api');

app.use(logger(customlogger));
app.use(cors());
// app.use(
//   '/api2/*',
//   cors({
//     origin: 'http://example.com',
//     allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
//     allowMethods: ['POST', 'GET', 'OPTIONS'],
//     exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
//     maxAge: 600,
//     credentials: true,
//   })
// )
//
app.route('/', user);
app.route('/', habit);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
