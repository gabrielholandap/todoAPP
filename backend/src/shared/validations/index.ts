import { z } from "zod";

export const ENV_SCHEMA = z.object({
  port: z.number().nonnegative().min(1),
  passwordSalt: z.string().min(16),
  jwt: z.object({
    accessTokenSecret: z.string().min(16),
    refreshTokenSecret: z.string().min(16),
  })
})