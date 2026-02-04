import db from '../database'
import { LoginInput, RegisterInput, LoginResponse, RegisterResponse } from '../interface/interface'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export class LoginService {
  static async login(credentials: LoginInput): Promise<string> {
    const { email, senha } = credentials
    const [rows] = await db.query(
      'SELECT id, nome, email, senha FROM users WHERE email = ? LIMIT 1',
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
        username: user.nome,
        first_name: user.nome.split(' ')[0],
        last_name: user.nome.split(' ')[1],
        user_type: 'user',
      },
      'access-token',
      { expiresIn: '360h' }
    )
    return accessToken

  }
}


export class RegisterService {
  static async register(credentials: RegisterInput): Promise<RegisterResponse> {
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
    return users[0];

  }
}
