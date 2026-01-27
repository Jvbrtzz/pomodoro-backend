import app from './app.js'
import { env } from './settings/env.js'

async function start() {
  try {
    await app.listen({ port: env.PORT, host: '0.0.0.0' })
    console.log('Servidor rodando', env.PORT)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
