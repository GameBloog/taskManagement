import { randomUUID } from "node:crypto"

export interface TaskProps {
  title: string
  description?: string
  done: boolean
  createdAt: Date
}

export class Task {
  private props: TaskProps
  public readonly id: string

  constructor(props: TaskProps, id?: string) {
    this.id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }

  get done() {
    return this.props.done
  }

  set done(value: boolean) {
    this.props.done = value
  }

  get createdAt() {
    return this.props.createdAt
  }
}
