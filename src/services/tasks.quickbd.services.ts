import {createTasksSchemaType, Task} from '../interface/interface'
import { db } from '../database/quick.db'

export class TasksService {
    static async listarTasks(): Promise<Task[]> {
        const tasks = await db.tasks.all()
        return tasks.map(task => task.value) as Task[]
    }

    static async criarTask(task: createTasksSchemaType): Promise<void> {
        const { nome, descricao, tempo } = task
        await db.tasks.set(Date.now().toString(), { id: Date.now(), nome, descricao, tempo })
    }  

    static async deletarTask(id: number): Promise<number> {
        return await db.tasks.delete(id.toString())
    }

  }
