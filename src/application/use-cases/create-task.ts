import { Task } from "../../domain/entities/task"
import type { TaskRepository } from "../../infra/repositories/in-memory-task-repository"

interface CreateTaskRequest {
  title: string
  description?: string
}

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ title, description }: CreateTaskRequest): Promise<Task> {
    const task = new Task({
      title,
      description,
      done: false,
      createdAt: new Date(),
    })

    await this.taskRepository.create(task)

    return task
  }
}
