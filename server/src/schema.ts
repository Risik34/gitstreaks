import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const habitSchema = z.object({
  name: z.string(),
  occurrence: z.number(),
});

export type User = z.infer<typeof userSchema>;
