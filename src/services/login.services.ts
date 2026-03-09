import db from '../database'
import { LoginInput, RegisterInput, LoginResponse, RegisterResponse } from '../interface/interface'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export class LoginService {
  static async login(credentials: LoginInput): Promise<string> {
    const { email, senha } = credentials
    const [rows] = await db.query(
      'SELECT id, nome, email, senha, user_type FROM users WHERE email = ? LIMIT 1',
      [email]
    )

    const users = rows as LoginResponse[]
    const user = users[0]

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      throw new Error('Invalid credentials')
    }

    const accessToken = jwt.sign(
      {
        user_id: user.id,
        name: user.nome,
        email: user.email,
        user_type: user.user_type,
      },
      'access-token',
      { expiresIn: '360h' }
    )
    return accessToken

  }
}


export class RegisterService {
  static async register(credentials: RegisterInput): Promise<RegisterResponse> {
    const { nome, email, senha, user_type } = credentials
    console.log(credentials)
    const hashedPassword = await bcrypt.hash(senha, 10);
    
    const [rows] = await db.query(
      'INSERT INTO users (nome, email, senha, user_type) VALUES (?, ?, ?, ?)',
      [nome, email, hashedPassword, user_type]
    )

    const users = rows as RegisterResponse[]
    if (users.length === 0) {
      throw new Error('Invalid credentials')
    }
    return users[0];

  }
  
}

export class GetUsers {
  static async getAllUsers(): Promise<RegisterResponse[]> {
    try {
      const [rows] = await db.query(
        'SELECT id, nome, email, user_type FROM users'
      )

      return rows as RegisterResponse[]

    } catch (error) {
      console.error('Erro ao buscar usuários:', error)

      throw new Error('Erro ao buscar usuários no banco de dados')
    }
  }

  static async getSearchUsers(search: string): Promise<RegisterResponse[]> {
    try {
      const searchTerm = `%${search}%`
      const [rows] = await db.query(
        'SELECT id, nome, email, user_type FROM users WHERE nome LIKE ?',
        [searchTerm]
      )

      return rows as RegisterResponse[]

    } catch (error) {
      console.error('Erro ao buscar usuários:', error)

      throw new Error('Erro ao buscar usuários no banco de dados')
    }
  }
}
