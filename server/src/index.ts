import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import dotenv from "dotenv";
dotenv.config();

import user from "./routes/user.js";

const app = new Hono().basePath("/api");

app.use(logger());

app.route("/", user);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
