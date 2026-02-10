export interface Task {
  id: number;
  nome: string;
  descricao?: string;
  tempo: number;
  user_id: number;
}

export type createTasksSchemaType = Omit<Task, 'id'>;

export type updateTasksSchemaType = Omit<Task, 'user_id'>;

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

