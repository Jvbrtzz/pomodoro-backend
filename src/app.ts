import Fastify, { FastifyInstance } from 'fastify'
import tasksRoutes from './routes/tasks.routes'
import cors from '@fastify/cors'

class App {
  public app: FastifyInstance

  constructor() {
    this.app = Fastify({ logger: true })
    this.routes()
    this.adHook()
  }

  private routes(): void {
    this.app.register(cors, { origin: "*"})
    this.app.register(tasksRoutes, { prefix: '/api/tasks' })
  }

  private adHook(): void {
    this.app.addHook('onRoute', ({method, path}) => {
      console.log(`Rota: [${method}] ${path}`)
    })
  }

}

export default new App().app
