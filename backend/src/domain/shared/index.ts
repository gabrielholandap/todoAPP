/* Responses */
export type GetManyResponse<Entity> = {
  results: Entity[]
  pagination: {
    total: number
    skip: number
    limit: number
  }
}
export type GetSingleResponse<Entity> = Entity | null
export type CreateResponse<Entity> = Entity | null
export type UpdateResponse<Entity> = Entity | null
export type DeleteResponse<Entity> = Entity | null