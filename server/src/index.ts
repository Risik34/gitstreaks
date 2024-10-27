import { serve } from "@hono/node-server";
import { Hono } from "hono";

import user from "./routes/user.js";

const app = new Hono().basePath("/api");

app.route('/',user)

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
