export class ReservationDateValidator {

  validate(date: Date | string) {
    const now = new Date();
    const minimumDate = new Date(now.getTime() + 30 * 60000);

    const reservationDate = new Date(date);

    if (isNaN(reservationDate.getTime())) {
      throw new Error("Invalid date format");
    }

    const hour = reservationDate.getHours();
    if (reservationDate < minimumDate) {
      throw new Error("Reservation must be at least 30 minutes in the future");
    }
    if (hour < 10 || hour >= 22) {
      throw new Error("Reservation must be within restaurant business hours (10:00 - 22:00)");
    }
    return reservationDate
  }

}