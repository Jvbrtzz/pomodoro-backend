import {createTasksSchemaType, Task, updateTasksSchemaType} from '../interface/interface'
import db from '../database'

export class HealthService {
    static async checkDatabaseConnection(): Promise<boolean> {
        try {  
            await db.query('SELECT 1')
            return true
        } catch (error) {
            return false
        }
    }
} 

export class TasksService {

    private static async assertTaskExists(id: number): Promise<void> {
        const getId = await db.query('SELECT id FROM tasks WHERE id = ?', [id])
            if ((getId[0] as any[]).length === 0){ 
                throw new Error('Task not found')
         }
    }

    static async listarTasks(user_id: number): Promise<Task[]> {
        const [rows] = await db.query('SELECT * FROM tasks WHERE user_id = ?', [user_id])
        return rows as Task[]
    }

    static async criarTask(task: createTasksSchemaType): Promise<void> {
        const { nome, descricao, tempo, user_id } = task
        await db.query('INSERT INTO tasks (nome, descricao, tempo, user_id) VALUES (?, ?, ?, ?)', [nome, descricao, tempo, user_id])
    }

    static async atualizarTask(id: number, task: updateTasksSchemaType): Promise<void> {
        const { nome, descricao, tempo } = task
        await this.assertTaskExists(id)
        await db.query('UPDATE tasks SET nome = ?, descricao = ?, tempo = ? WHERE id = ?', [nome, descricao, tempo, id])
    }

    static async deletarTask(id: number): Promise<void> {
        await this.assertTaskExists(id)
        await db.query('DELETE FROM tasks WHERE id = ?', [id])
    }

  }
