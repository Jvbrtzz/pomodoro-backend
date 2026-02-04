export interface Task {
  id: number;
  nome: string;
  descricao?: string;
  tempo: number;
}

export type createTasksSchemaType = Omit<Task, 'id'>;

export type updateTasksSchemaType = Task;

export interface User {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

export type RegisterInput = Pick<User, 'nome' | 'email' | 'senha'>;

export type RegisterResponse = Omit<User, 'senha'>;

export type LoginInput = Pick<User, 'email' | 'senha' >;

export type LoginResponse = User;

