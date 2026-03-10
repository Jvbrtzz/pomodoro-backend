import { loginSchema, resgisterSchema, searchUsersSchema } from '../settings/env'
import { LoginService, RegisterService, GetUsers } from '../services/login.services'

export async function login(req: any, res: any): Promise<void> {
  const result = loginSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).send({
      error: 'Dados invalidos',
      details: result.error.format(),
    })
    return
  }

  try {
    const user = await LoginService.login(result.data)
    res.status(200).send({ message: 'Login realizado com sucesso', user })
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid credentials') {
      res.status(401).send({ error: 'Credenciais invalidas' })
      return
    }
    res.status(500).send({ error: 'Erro ao realizar login' })
  }
}

export async function register(req: any, res: any): Promise<void> {
  const result = resgisterSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).send({
      error: result.error.format(),
    })
    return
  }

  try {
    await RegisterService.register(result.data)
    res.status(200).send({ message: 'Cadastro realizado com sucesso' })
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid credentials') {
      res.status(401).send({ error: 'Credenciais invalidas' })
      return
    }
    res.status(500).send({ error: 'Erro ao realizar registro' })
  }
}

export async function getUsers(req: any, res: any): Promise<void> {
  try {
    const users = await GetUsers.getAllUsers()
    res.status(200).send({ message: 'Usuarios recuperados com sucesso', users })
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid credentials') {
      res.status(401).send({ error: 'Credenciais invalidas' })
      return
    }
    res.status(500).send({ error: 'Erro ao recuperar usuarios' })
  }
}

export async function searchUsers(req: any, res: any): Promise<void> {
  const result = searchUsersSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).send({
      error: 'Dados invalidos',
      details: result.error.format(),
    })
    return
  }

  try {
    const users = await GetUsers.getSearchUsers(result.data.term)
    res.status(200).send({ message: 'Usuarios recuperados com sucesso', users })
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid credentials') {
      res.status(401).send({ error: 'Credenciais invalidas' })
      return
    }
    res.status(500).send({ error: 'Erro ao recuperar usuarios' })
  }
}
