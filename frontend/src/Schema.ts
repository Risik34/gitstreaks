import { z } from 'zod';

export const signUpSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6, 'Password must be atleast 6 char long'),
});

export const loginSchema = z.object({
  email: z.string().email('Email invalid'),
  password: z.string(),
});

export const habitSchema = z.object({
  name: z.string(),
  occurrence: z.string().min(1).transform(val=>Number(val))
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
export type HabitSchemaType = z.infer<typeof habitSchema>;
