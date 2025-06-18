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

  async findAllByUserId(user_id: string): Promise<Reservation[] | null> {
    const reservations = await prisma.reservation.findMany({
      where: { user_id: user_id },
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


  async findByTableAndDate(tableId: string, date: Date): Promise<Reservation | null> {
    const data = await prisma.reservation.findFirst({
      where: {
        table_id: tableId,
        data_reservation: date,
      },
    });

    if (!data) return null;

    return new Reservation({
      id: data.id,
      user_id: data.user_id,
      table_id: data.table_id,
      data_reservation: data.data_reservation,
      status: data.status,
    });
  }

  async findByUserAndDate(user_id: string, date_reservation: Date): Promise<Reservation | null> {
    const data = await prisma.reservation.findFirst({
      where: {
        user_id: user_id,
        data_reservation: date_reservation,
      },
    })

    if (!data) return null

    return new Reservation({
      id: data.id,
      user_id: data.user_id,
      table_id: data.table_id,
      data_reservation: data.data_reservation,
      status: data.status
    })

  }

}