import { FastifyRequest, FastifyReply } from 'fastify'
import jwt from 'jsonwebtoken'

declare module 'fastify' {
  interface FastifyRequest {
    userType?: string
  }
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-token'

export async function userTypeHook(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // expect token via Authorization: Bearer <token> or x-access-token header
  const authHeader = request.headers['authorization'] as string | undefined
  const tokenFromHeader = authHeader ? authHeader.split(' ')[1] : undefined
  const token = tokenFromHeader 
  if (!token) {
    return reply.status(400).send({ error: 'Access token é obrigatório' })
  }

  try {
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET) as Record<string, any>
    const userType = payload.user_type || payload.userType

    if (!userType || typeof userType !== 'string') {
      return reply.status(403).send({ error: 'Tipo inválido' })
    }

    if (!['admin'].includes(userType)) {
      return reply.status(403).send({ error: 'Tipo inválido' })
    }

    request.userType = userType
  } catch (err) {
    return reply.status(401).send({ error: 'Token inválido' })
  }
}

export default userTypeHook
