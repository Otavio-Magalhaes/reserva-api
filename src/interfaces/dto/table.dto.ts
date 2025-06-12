import type { z } from "zod";
import type { createTableSchema } from "../schemas/createTable.schema.js";


export type createTableDTO = z.infer< typeof createTableSchema>

