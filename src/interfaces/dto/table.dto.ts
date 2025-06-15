import type { z } from "zod";
import type { createTableSchema } from "../schemas/createTable.schema.js";
import type { updateTableSchema } from "../schemas/updateTable.schema.js";


export type createTableDTO = z.infer< typeof createTableSchema>

export type updateTableDTO = z.infer<typeof updateTableSchema>