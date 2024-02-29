import type { Todo } from "./Todo"

export class User {
  id!: string
  createdAt!: Date
  updatedAt!: Date

  email!: string
  password!: string

  todos?: Todo[]
}