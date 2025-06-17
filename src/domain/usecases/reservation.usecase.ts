import type { createReservationDTO } from "../../interfaces/dto/reservation.dto.js";
import { Reservation } from "../entities/reservation.entity.js";
import type { ReservationRepository } from "../repositories/reservation.repository.js";
import type { TableRepository } from "../repositories/table.repository.js";
import { UserRepository } from "../repositories/user.repository.js";
import { TableValidator } from "../validators/table.validator.js";
import { UserValidator } from "../validators/user.validator.js";

export async function createReservation(reservationRepository: ReservationRepository, userRepository: UserRepository, tableRepository: TableRepository, reservationData: createReservationDTO) {
  try {
    const userValidator = new UserValidator(userRepository);
    const existingUser = await userValidator.ensureUserExists(reservationData.user_id)

    const tableValidator = new TableValidator(tableRepository)
    const existingTable = await tableValidator.ensureTableExists(reservationData.table_id)
    
    const now = new Date();
    const minimumDate = new Date(now.getTime() + 30 * 60000);

    const reservationDate = new Date(reservationData.data_reservation);
    if (isNaN(reservationDate.getTime())) {
      throw new Error("Invalid date format");
    }
    const hour = reservationDate.getHours();

    if (reservationData.data_reservation < minimumDate) {
      throw new Error("Reservation must be at least 30 minutes in the future");
    }
    if (hour < 10 || hour >= 22) {
      throw new Error("Reservation must be within restaurant business hours (10:00 - 22:00)");
    }

    const newReservation = new Reservation({
      user_id: reservationData.user_id,
      table_id: reservationData.table_id,
      status: reservationData.status,
      data_reservation: reservationDate
    })
    const result = reservationRepository.create(newReservation)
  } catch (err) {
    throw err
  }
}


export async function getAllUserReservation(reservationRepository:ReservationRepository, userId:string): Promise<Reservation[]>{
  try {
    const reservations = await reservationRepository.findAllByUserId(userId);

    if (!reservations || reservations.length === 0) {
      throw new Error("No reservations found for this user");
    }
    return reservations;
  } catch (err) {
    throw err
  }
}