import { z } from "zod";

export const envSchema = z.object({
  PORT: z.string().optional(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
})