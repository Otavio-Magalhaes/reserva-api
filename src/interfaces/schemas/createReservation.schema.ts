import { z } from "zod";

const MINUTES_IN_FUTURE = 30

const nowPlus30Min = new Date(Date.now() + MINUTES_IN_FUTURE * 60 * 1000)

export const createReservationSchema = z.object({
  user_id: z.string(),
  table_id: z.string(),
  data_reservation: z.preprocess(
    (val) => (typeof val === 'string' || val instanceof Date ? new Date(val) : undefined),
    z.date().min(nowPlus30Min,{
      message:`Reservation must be at least ${MINUTES_IN_FUTURE} minutes from now`
    })
  ),
  status: z.enum([
    'active',
    'cancelled'
  ])
})