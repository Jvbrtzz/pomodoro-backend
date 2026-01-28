import { FastifyInstance } from 'fastify'
import { createTasksSchema } from '../settings/env'
import { TasksService } from '../services/tasks.services.js'

export default async function tasksRoutes(app: FastifyInstance) {
app.get('/', async (req, res) => {
   try {
      const tasks = await TasksService.listarTasks()
      return tasks
    } catch (error) {
      res.status(500).send({ error: 'Erro ao listar tarefas' })
    }
})
  app.post('/', async (req, res) => {
    const result = createTasksSchema.safeParse(req.body)
    console.log(result)
    if (!result.success) {
      return res.status(400).send({
        error: 'Dados inválidos',
        details: result.error.format(),
      })
   }

    try {
      await TasksService.criarTask({
        nome: result.data.nome,
        descricao: result.data.descricao,
        tempo: result.data.tempo || 25,
      })
      res.status(201).send({ message: 'Tarefa criada com sucesso' })
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'Erro ao criar tarefa' })
    }
  })
}
