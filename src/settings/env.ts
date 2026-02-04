import { z } from 'zod'
import { createTasksSchemaType, updateTasksSchemaType, LoginInput, RegisterInput } from '../interface/interface'

export const createTasksSchema = z.object({
  nome: z.string().min(3),
  descricao: z.string().optional(),
  tempo: z.coerce.number().int().min(18)
}) satisfies z.ZodType<createTasksSchemaType>

export const updateTasksSchema = z.object({
  nome: z.string().min(3),
  descricao: z.string().optional(),
  tempo: z.coerce.number().int().min(18)
}) 

export const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export const loginSchema = z.object({
  email: z.string().email(),
  senha: z.coerce.string().min(4),
}) satisfies z.ZodType<LoginInput>

export const resgisterSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  senha: z.coerce.string().min(4),
}) satisfies z.ZodType<RegisterInput>


const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DB_HOST: z.string().default('localhost'),
  DB_USER: z.string().default('root'),
  DB_PASSWORD: z.string().default('root'),
  DB_NAME: z.string().default('pomodoro'),
})


export const env = envSchema.parse(process.env)
