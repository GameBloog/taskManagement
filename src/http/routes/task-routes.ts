import type { FastifyInstance } from "fastify"
import { createTaskController } from "../controllers/create-task-controller"
import { listTaskController } from "../controllers/list-task-controller"
import type { TaskRepository } from "../../infra/repositories/in-memory-task-repository"
import { getTaskByIdController } from "../controllers/get-task-by-id- controller"

export async function taskRoutes(app: FastifyInstance, options: {taskRepository: TaskRepository}) {
  const {taskRepository} = options

  app.post("/tasks", createTaskController(taskRepository))
  app.get("/tasks", listTaskController(taskRepository))
  app.get("/tasks/:id", getTaskByIdController(taskRepository))
}
