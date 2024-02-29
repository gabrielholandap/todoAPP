import type { User } from "./User"

export class Todo {
  id!: string
  createdAt!: Date
  updatedAt!: Date

  title!: string
  description?: string
  finishedAt?: Date

  user!: User
}