import { z } from "zod"
import { envSchema } from "../interfaces/schemas/env.schema.js"
import dotenv from "dotenv"

dotenv.config()

const env = envSchema.parse(process.env)

export const config = {
  port: env.PORT ? parseInt(env.PORT, 10) : 3000,
  jwtSecret: env.ACCESS_TOKEN_SECRET,
  jwtRefreshToken: env.REFRESH_TOKEN_SECRET,
  
} as const
