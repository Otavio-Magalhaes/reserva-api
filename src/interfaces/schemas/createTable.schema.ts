import { z } from "zod"

export const createTableSchema = z.object({
  name: z.string().min(3),
  capacity: z.number(),
  status: z.enum([
    'available',
    'reserved',
    'inactive'
  ])
})