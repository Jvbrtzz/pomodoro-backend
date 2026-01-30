import Fastify, { FastifyInstance } from 'fastify'
import tasksRoutes from './routes/tasks.routes'
import cors from '@fastify/cors'
import 'dotenv/config'
import middlewareHeaders from './middleware/middlewar.header'
import helmet from '@fastify/helmet'

class App {
  public app: FastifyInstance

  constructor() {
    this.app = Fastify({ logger: true })
    this.routes()
    this.adHook()
  }

  private routes(): void {
    this.app.register(cors, { origin: "*"})
    this.app.register(helmet)
    this.app.register(tasksRoutes, { prefix: '/api/tasks' })
  }

  private adHook(): void {
    this.app.addHook('onRoute', ({method, path}) => {
      console.log(`Rota: [${method}] ${path}`)
    })

    this.app.addHook('onSend', middlewareHeaders) //hook para adicionar headers de segurança, mas nao necessario com helmet
  }

}

export default new App().app
