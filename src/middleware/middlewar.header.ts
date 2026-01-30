import { FastifyRequest, FastifyReply } from 'fastify'

const middlewareHeaders = async (request: FastifyRequest, reply: FastifyReply) => {
      reply.header('X-Content-Type-Options', 'nosniff')
      reply.header('X-Frame-Options', 'DENY')
      reply.header('X-XSS-Protection', '1; mode=block')
      reply.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      reply.header('Pragma', 'no-cache')
      reply.header('Expires', '0')
      reply.header('Content-Type', 'application/json; charset=utf-8')
    }
    
export default middlewareHeaders