import { loginSchema, resgisterSchema } from '../settings/env'
import { LoginService, RegisterService } from '../services/login.services'

export async function login(req: any, res: any): Promise<void> {
  const result = loginSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).send({
      error: 'Dados inválidos',
      details: result.error.format(),
    })
    return
  }

  try {
    const user = await LoginService.login(result.data)
    res.status(200).send({ message: 'Login realizado com sucesso', user })
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid credentials') {
      res.status(401).send({ error: 'Credenciais inválidas' })
      return
    }
    res.status(500).send({ error: 'Erro ao realizar login' })
  }
}

export async function register(req: any, res: any): Promise<void> {
  const result = resgisterSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).send({
      error: 'Dados inválidos',
      details: result.error.format(),
    })
    return
  }

  try {
    const user = await RegisterService.register(result.data)
    console.log(user)
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid credentials') {
      res.status(401).send({ error: 'Credenciais inválidas' })
      return
    }
    res.status(200).send({ message: 'Cadastro realizado com sucesso' })
  }
}

