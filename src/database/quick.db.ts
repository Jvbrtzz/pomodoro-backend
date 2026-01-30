import { QuickDB } from 'quick.db'

export const db = {
    tasks: new QuickDB<{ id: number; nome: string; descricao?: string; tempo: number }>({ filePath: 'pomodoro.db' })
}