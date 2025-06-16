import { z } from "zod"
import {
  InMemoryTaskRepository,
  type TaskRepository,
} from "../../infra/repositories/in-memory-task-repository"
import type { FastifyReply, FastifyRequest } from "fastify"
import { GetTaskByIdUseCase } from "../../application/use-cases/get-task-by-id"
import { TaskNotFoundError } from "../../utils/erros"

const paramsSchema = z.object({
  id: z.string(),
})

export const getTaskByIdController = (taskRepository: TaskRepository) => {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const { id } = paramsSchema.parse(request.params)
    const getTaskByIdUseCase = new GetTaskByIdUseCase(taskRepository)
    try {
      const task = await getTaskByIdUseCase.execute({ id })
      return reply.status(200).send(task)
    } catch (error) {
      if (error instanceof TaskNotFoundError) {
        return reply.status(404).send({ message: error.message })
      }
    }

    return reply.status(500).send({ message: "Internal server error" })
  }
}
