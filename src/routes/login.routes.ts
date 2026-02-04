import { FastifyInstance } from 'fastify'
import { login, register } from '../controller/login.controller'

export default async function loginRoutes(app: FastifyInstance) {
  app.post('/login', login)

  app.post('/register', register)
}
