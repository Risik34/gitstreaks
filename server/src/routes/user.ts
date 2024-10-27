import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const user = new Hono();

const prisma = new PrismaClient();

const secret = process.env.SECRET;

user.post("/signup", async (c) => {
  const { email, password } = await c.req.json();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return c.json({ message: "User already exists" }, 409);
  }

  const hashedPassword = bcrypt.hash(password, 12);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, secret, {
    expiresIn: "1h",
  });
});

export default user;
