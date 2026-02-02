import { FastifyInstance } from 'fastify'
import { checkHealth } from '../controller/health.controller'

export default async function health(app: FastifyInstance) {
    app.get('/', async () => {
        return { message: 'API Pomodoro funcionando!' }
    })
    app.get('/health', checkHealth)
}
