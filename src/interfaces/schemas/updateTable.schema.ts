import { z } from "zod";

export const updateTableSchema = z.object({
  name: z.string().min(3, "name has to be at least 3 caracter ").optional(),
  capacity: z.number().min(1, "capacity has to be at leat 1").optional(),
  status: z.enum([
    'available',
    'reserved',
    'inactive'
  ]).optional()
})