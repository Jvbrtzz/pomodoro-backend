import { FastifyInstance } from 'fastify'
import { createTasksSchema, updateTasksSchema, paramsSchema } from '../settings/env'
import { TasksService } from '../services/tasks.services.js'
import { getAlltasks, updateTaskasync, createTaskasync, deleteTask } from '../controller/tasks.controller'

export default async function tasksRoutes(app: FastifyInstance) {
  
  app.get('/getTasks', getAlltasks)

  app.post('/createTask', createTaskasync)

  app.put<{ Params: { id: string }}>('/updateTask/:id', updateTaskasync)

  app.delete<{ Params: { id: string }}>('/deleteTask/:id', deleteTask)

}
