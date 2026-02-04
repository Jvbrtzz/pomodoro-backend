import db from '../database'
import { LoginInput, RegisterInput, LoginResponse, RegisterResponse } from '../interface/interface'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export class LoginService {
  static async login(credentials: LoginInput): Promise<string> {
    const { email, senha } = credentials
    const [rows] = await db.query(
      'SELECT id, nome, email FROM users WHERE email = ? AND senha = ? LIMIT 1',
      [email, senha]
    )

    const users = rows as LoginResponse[]
    if (users.length === 0) {
      throw new Error('Invalid credentials')
    }
    const token =jwt.sign({ id: users[0].id, email: users[0].email }, 'your-secret-key', { expiresIn: '1h' })
    return token

  }
}


export class RegisterService {
  static async register(credentials: RegisterInput): Promise<string> {
    const { nome, email, senha } = credentials
    const hashedPassword = await bcrypt.hash(senha, 10);
    
    const [rows] = await db.query(
      'INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, hashedPassword]
    )

    const users = rows as RegisterResponse[]
    if (users.length === 0) {
      throw new Error('Invalid credentials')
    }
    const token =jwt.sign({ id: users[0].id, email: users[0].email }, 'your-secret-key', { expiresIn: '1h' })
    return token

  }
}
