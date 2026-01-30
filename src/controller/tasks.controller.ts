import { FastifyInstance } from 'fastify'
import { createTasksSchema, updateTasksSchema, paramsSchema } from '../settings/env'
import { TasksService } from '../services/tasks.services.js'
import { Task } from '../interface/interface'

function getAlltasks(req: any, res: any): Promise<Task[]> | void {
   try {
      const tasks = TasksService.listarTasks()
      return tasks
    } catch (error) {
      res.status(500).send({ error: 'Erro ao listar tarefas' })
    }
}

async function createTaskasync (req: any, res: any) :Promise<void> {
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
  }

async function updateTaskasync (req: any, res: any) :Promise<void> { 
    const params = paramsSchema.safeParse(req.params)
    if (!params.success) {
      return res.status(400).send({ error: 'ID inválido' })
    }
    const result = updateTasksSchema.safeParse(req.body)
    console.log(result)
    if (!result.success) {
      return res.status(400).send({
        error: 'Dados inválidos',
        details: result.error.format(),
      })
   }
    try {
      await TasksService.atualizarTask(Number(req.params.id), {
        id: Number(req.params.id),
        nome: result.data.nome,
        descricao: result.data.descricao,
        tempo: result.data.tempo || 25,
      })
      res.status(201).send({ message: 'Tarefa atualizada com sucesso' })
    } catch (error) {
      if (error instanceof Error && error.message === 'Task not found'){
        return res.status(404).send({ error: 'Tarefa não encontrada' })
      }
      res.status(500).send({ error: 'Erro ao atualizar tarefa' })
    }
  }

async function deleteTask(req: any, res: any): Promise<Promise<Task[]> | void> {
    try {
      const id = Number(req.params.id)
      await TasksService.deletarTask(id)

      res.status(200).send({ message: 'Tarefa deletada com sucesso' })
    } catch (error) {
      res.status(500).send({ error: 'Erro ao deletar tarefa' })
    }
}

export {
  getAlltasks,
  createTaskasync,
  updateTaskasync,
  deleteTask
}