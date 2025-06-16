import {
  type TaskRepository,
} from "../../infra/repositories/in-memory-task-repository"
import type { FastifyReply, FastifyRequest } from "fastify"
import { ListTaskUseCase } from "../../application/use-cases/list-task"

export const listTaskController = (taskRepository: TaskRepository) => {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const listTaskUseCase = new ListTaskUseCase(taskRepository)

    const tasks = await listTaskUseCase.execute()

    return reply.status(200).send(tasks)
  }
}
