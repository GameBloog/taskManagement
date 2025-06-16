import { Task } from "../../domain/entities/task"
import type { TaskRepository } from "../../infra/repositories/in-memory-task-repository"
import { TaskNotFoundError } from "../../utils/erros"

interface GetTaskByIdRequest {
  id: string
}

export class GetTaskByIdUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ id }: GetTaskByIdRequest): Promise<Task> {
    const task = await this.taskRepository.findById(id)

    if (!task) {
      throw new TaskNotFoundError("Task not found")
    }

    return task
  }
}
