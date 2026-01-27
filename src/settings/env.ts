import { z } from 'zod'

export const createTasksSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  time: z.coerce.number().int().min(18).optional(),
})

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

export const env = envSchema.parse(process.env)
