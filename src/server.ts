import fastify from "fastify"
import { taskRoutes } from "./http/routes/task-routes"
import { InMemoryTaskRepository } from "./infra/repositories/in-memory-task-repository"

const app = fastify()

const taskRepository = new InMemoryTaskRepository()

app.register(taskRoutes, { taskRepository })

app.listen({ port: 3333 }).then(() => {
  console.log("🚀 Server running on http://localhost:3333")
})
