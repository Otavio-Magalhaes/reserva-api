import type { Reservation } from "../entities/reservation.entity.js"

export abstract class ReservationRepository{
  async create(reservation: Reservation): Promise<Reservation | null>{
    throw new Error('Method not Implemented.')
  }

  async findById(id: string): Promise <Reservation | null>{
    throw new Error('Method not Implemented.')
  }
  
  async update(reservation: Reservation): Promise <Reservation | null>{
    throw new Error('Method not Implemented')
  }

  async findAllByUserId(id:string): Promise<Reservation[] | null >{
    throw new Error('Method not Implemented')
  }

  async findByTableAndDate(table_id:string, date_reservation:Date): Promise<Reservation | null>{
    throw new Error('Method not Implemented')
  }

  async findByUserAndDate(user_id:string, date_reservation:Date):Promise<Reservation | null>{
    throw new Error('Method not Implemented')
  }
}