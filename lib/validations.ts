import { z } from 'zod';

// Task validation schema
export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters')
    .trim(),
  status: z.enum(['Todo', 'In Progress', 'Done'], {
    errorMap: () => ({ message: 'Invalid status' }),
  }),
  priority: z.enum(['High', 'Medium', 'Low'], {
    errorMap: () => ({ message: 'Invalid priority' }),
  }),
  assignee: z
    .string()
    .max(100, 'Assignee name must be less than 100 characters')
    .optional(),
  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
    .optional(),
  progress: z
    .number()
    .min(0, 'Progress must be at least 0')
    .max(100, 'Progress must be at most 100')
    .optional(),
});

// Task creation schema (without id)
export const createTaskSchema = taskSchema;

// Task update schema (all fields optional)
export const updateTaskSchema = taskSchema.partial();

// Type inference
export type TaskInput = z.infer<typeof taskSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

// Validation helper
export function validateTask(data: unknown): { success: true; data: TaskInput } | { success: false; errors: string[] } {
  const result = taskSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors = result.error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
  return { success: false, errors };
}

// Environment validation
export const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anon key is required'),
});

export function validateEnv() {
  const result = envSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  if (!result.success) {
    console.warn('Environment validation failed:', result.error.errors);
    return false;
  }

  return true;
}
