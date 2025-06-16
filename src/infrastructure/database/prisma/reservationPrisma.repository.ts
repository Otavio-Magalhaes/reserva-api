import { PrismaClient } from "@prisma/client";
import { ReservationRepository } from "../../../domain/repositories/reservation.repository.js";
import { Reservation } from "../../../domain/entities/reservation.entity.js";

const prisma = new PrismaClient()
export class ReservationPrismaRepository extends ReservationRepository {
  async create(reservation: Reservation): Promise<Reservation | null> {
    const createReservation = await prisma.reservation.create({
      data: reservation.toPlainObject()
    })

    return new Reservation({
      id: reservation.id,
      user_id: reservation.user_id,
      table_id: reservation.table_id,
      status: reservation.status,
      data_reservation: reservation.data_reservation
    })
  }

  async findAllByUserId(userId: string): Promise<Reservation[] | null> {
    const reservations = await prisma.reservation.findMany({
      where: { user_id: userId },
      orderBy: { data_reservation: "desc" }
    })

    return reservations.map(reservation => new Reservation({
      id: reservation.id,
      user_id: reservation.user_id,
      table_id: reservation.table_id,
      status: reservation.status,
      data_reservation: reservation.data_reservation
    }));
  }

}