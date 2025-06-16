import { z } from "zod"
import {
  InMemoryTaskRepository,
  type TaskRepository,
} from "../../infra/repositories/in-memory-task-repository"
import { CreateTaskUseCase } from "../../application/use-cases/create-task"
import type { FastifyReply, FastifyRequest } from "fastify"

const bodySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
})

export const createTaskController = (taskRepository: TaskRepository) => {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const createTaskUseCase = new CreateTaskUseCase(taskRepository)

    const { title, description } = bodySchema.parse(request.body)
    const task = await createTaskUseCase.execute({ title, description })

    return reply.status(201).send(task)
  }
}
