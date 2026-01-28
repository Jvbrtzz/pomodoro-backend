import Task from '../interface/interface'
import db from '../database'

export class TasksService {
    static async listarTasks(): Promise<Task[]> {
        const [rows] = await db.query('SELECT * FROM tasks')
        return rows as Task[]
    }

    static async criarTask(task: Omit<Task, 'id'>): Promise<void> {
        const { nome, descricao, tempo } = task
        await db.query('INSERT INTO tasks (nome, descricao, tempo) VALUES (?, ?, ?)', [nome, descricao, tempo])
    }  


  }
