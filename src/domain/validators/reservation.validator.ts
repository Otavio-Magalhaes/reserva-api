import type { ReservationRepository } from "../repositories/reservation.repository.js";

export class ReservationValidator{
  constructor(private reservationRepository:ReservationRepository){}

  async ensureNoConflictReservation(table_id: string, user_id: string, date: Date): Promise<void> {
    const existingTableReservation = await this.reservationRepository.findByTableAndDate(table_id, date);
    if (existingTableReservation) {
      throw new Error("There is already a reservation for this table at the selected time.");
    }
    const existingUserReservation = await this.reservationRepository.findByUserAndDate(user_id, date);
    if (existingUserReservation) {
      throw new Error("User already has a reservation at the selected time.");
    }
  }
}