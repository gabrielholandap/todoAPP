import express from 'express'
import 'express'

export type ParsedQs = {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[]
}

export interface query extends ParsedQs {
  take?: string | number
  skip?: string | number
}

export interface userData {
  id?: string
}

declare module 'express' {
  export interface Request extends express.Request {
    query: query
    userData?: userData
  }
}