import { z } from 'zod';

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(4, { message: 'Be at least 4 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password field must not be empty.' }),
});

export const CreateSchema = z.object({
  title: z.string().min(1, { message: 'field must not be empty.' }),
  content: z.string().min(1, { message: 'field must not be empty.' }),
});



export type FormState =
  {
    errors?: {
      name?: string[];
      email?: string[];
      password?: string[];
    };
    message?: string;
  }
  | undefined;

export type FormStateCreate =
  {
    errors?: {
      title?: string[];
      content?: string[];
    };
    message?: string;
  }
  | undefined;

