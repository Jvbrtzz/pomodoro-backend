import { z } from 'zod'

export const createTasksSchema = z.object({
  nome: z.string().min(3),
  descricao: z.string(),
  tempo: z.coerce.number().int().min(18).optional(),
})

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DB_HOST: z.string().default('localhost'),
  DB_USER: z.string().default('root'),
  DB_PASSWORD: z.string().default('root'),
  DB_NAME: z.string().default('pomodoro'),
})

export const env = envSchema.parse(process.env)
