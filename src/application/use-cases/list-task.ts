import { Task } from "../../domain/entities/task"
import type { TaskRepository } from "../../infra/repositories/in-memory-task-repository"

export class ListTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(): Promise<Task[]> {
    const tasks = await this.taskRepository.findAll()

    return tasks
  }
}
