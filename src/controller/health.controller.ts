import { HealthService } from "../services/tasks.services"

export async function checkHealth(req: any, res: any): Promise<void> {
    try {
        const dbConnected = await HealthService.checkDatabaseConnection()
        if (dbConnected) {
            res.status(200).send({ status: 'healthy', database: 'connected' })
        } else {
            res.status(500).send({ status: 'unhealthy', database: 'disconnected' })
        }
    } catch (error) {
        res.status(500).send({ status: 'unhealthy', database: 'disconnected', error:error instanceof Error && error.message })
    }

}
