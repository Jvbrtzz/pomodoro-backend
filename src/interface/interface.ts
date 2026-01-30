export interface Task {
  id: number;
  nome: string;
  descricao?: string;
  tempo: number;
}

export type createTasksSchemaType = Omit<Task, 'id'>;

export type updateTasksSchemaType = Task;

