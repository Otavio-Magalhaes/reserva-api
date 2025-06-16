import { z } from "zod";
import type { createReservationSchema } from "../schemas/createReservation.schema.js";

export type createReservationDTO = z.infer<typeof createReservationSchema>