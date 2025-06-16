import type { Task } from "../../domain/entities/task"

export interface TaskRepository {
  create(task: Task): Promise<void>
  findAll(): Promise<Task[]>
  findById(id: string): Promise<Task | null>
}

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = []

  async create(task: Task): Promise<void> {
    this.tasks.push(task)
  }

  async findAll(): Promise<Task[]> {
    return this.tasks
  }

  async findById(id: string): Promise<Task | null> {
    const task = this.tasks.find((task) => task.id === id)

    return task ?? null
  }
}
