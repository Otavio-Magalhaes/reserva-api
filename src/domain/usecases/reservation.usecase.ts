import type { createReservationDTO } from "../../interfaces/dto/reservation.dto.js";
import { Reservation } from "../entities/reservation.entity.js";
import type { ReservationRepository } from "../repositories/reservation.repository.js";
import type { TableRepository } from "../repositories/table.repository.js";
import { UserRepository } from "../repositories/user.repository.js";
import { ReservationValidator } from "../validators/reservation.validator.js";
import { ReservationDateValidator } from "../validators/reservationDate.validator.js";
import { TableValidator } from "../validators/table.validator.js";
import { UserValidator } from "../validators/user.validator.js";

export async function createReservation(
  reservationRepository: ReservationRepository, 
  userRepository: UserRepository, 
  tableRepository: TableRepository, 
  reservationData: createReservationDTO
) {
  try {
    const userValidator = new UserValidator(userRepository);
    const existingUser = await userValidator.ensureUserExists(reservationData.user_id)

    const tableValidator = new TableValidator(tableRepository)
    const existingTable = await tableValidator.ensureTableExists(reservationData.table_id)
    const tableStatus = await tableValidator.checkTableStatus(reservationData.table_id)
    if(tableStatus!="available"){
      throw new Error("Table is not available")
    }
    tableValidator.updateTableStatus(reservationData.table_id, 'reserved')

    const dateReservationValidator = new ReservationDateValidator()
    const reservationDate = dateReservationValidator.validate(reservationData.data_reservation)

    const reservationValidator = new ReservationValidator(reservationRepository)
    const noConflictTableAndUser = await reservationValidator.ensureNoConflictReservation(reservationData.table_id, reservationData.user_id, reservationDate)
    
    const newReservation = new Reservation({
      user_id: reservationData.user_id,
      table_id: reservationData.table_id,
      status: reservationData.status,
      data_reservation: reservationDate
    })
    const result = await reservationRepository.create(newReservation)
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