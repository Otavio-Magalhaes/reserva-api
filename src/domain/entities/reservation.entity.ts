import type { createReservationDTO } from "../../interfaces/dto/reservation.dto.js";

type statusReservation = createReservationDTO["status"]


const enum reservationStatus{
   'active',
  'cancelled'
}

export type reservationProps = {
    id?:string;
    user_id: string;
    table_id: string;
    data_reservation:Date
    status: statusReservation
}

export class Reservation{
  public readonly id?:string;
  public user_id: string;
  public table_id: string;
  public data_reservation:Date
  public status: statusReservation
  constructor(props: reservationProps){
    this.user_id = props.user_id
    this.table_id = props.table_id
    this.status = props.status
    this.data_reservation = props.data_reservation
  }


  toPlainObject(){
    return {
      id: this.id,
      user_id: this.user_id,
      table_id: this.table_id,
      status: this.status,
      data_reservation: this.data_reservation

    }
  }
}

