import { FastifyInstance } from 'fastify'
import { createTasksSchema } from '../settings/env'

export default async function tasksRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    
  })

  app.post('/', async (req, res) => {
    const result = createTasksSchema.safeParse(req.body)
    
    if (!result.success) {
      return res.status(400).send({
        error: 'Dados inválidos',
        details: result.error.format(),
      })
  }
  })
}
