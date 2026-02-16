import { FastifyInstance } from 'fastify'
import { getAlltasks, updateTask, createTask, deleteTask } from '../controller/tasks.controller'

export default async function tasksRoutes(app: FastifyInstance) {
  
  app.post('/getTasks', getAlltasks)

  app.post('/createTask', createTask)

  app.put<{ Params: { id: string }}>('/updateTask/:id', updateTask)

  app.delete<{ Params: { id: string }}>('/deleteTask/:id', deleteTask)

}
