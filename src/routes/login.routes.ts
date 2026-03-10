import { FastifyInstance } from 'fastify'
import { login, register, getUsers, searchUsers } from '../controller/login.controller'
import userTypeHook from '../middleware/middlewar.header'


export default async function loginRoutes(app: FastifyInstance) {
  app.post('/login', login)

  app.post('/register', register)

  app.get('/getusers', { preHandler: userTypeHook }, getUsers)

  app.post('/searchusers', { preHandler: userTypeHook }, searchUsers)
  }
