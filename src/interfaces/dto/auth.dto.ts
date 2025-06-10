import { z } from "zod";
import type { loginSchema } from "../schemas/login.schema.js";

export type loginDTO = z.infer<typeof loginSchema>