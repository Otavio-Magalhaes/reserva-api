import {Request, Response} from "express"
import type { createReservationDTO } from "../dto/reservation.dto.js"
import { createReservation } from "../../domain/usecases/reservation.usecase.js"
import { ReservationPrismaRepository } from "../../infrastructure/database/prisma/reservationPrisma.repository.js"
import { UserPrismaRepository } from "../../infrastructure/database/prisma/userPrisma.repository.js"
import { tablePrismaRepository } from "../../infrastructure/database/prisma/tablePrisma.repository.js"

const ReservationRepository = new ReservationPrismaRepository
const UserRepository = new UserPrismaRepository
const TableRepository = new tablePrismaRepository
export async function handlerReservation(request:Request, response:Response){
  try {

    const reservationData:createReservationDTO = request.body 
    const newReservation = await createReservation(ReservationRepository, UserRepository,TableRepository ,reservationData)
    response.status(201).json({
      message: "Reservation Create Sucessfuly",
      reservation: newReservation
    })
  } catch (err) {
    console.log(err)
    if(err instanceof Error && err.message == "User Not Found"){
      response.status(400).json({message: err.message})
    } else if(err instanceof Error && err.message == "Table Not Found"){
      response.status(400).json({message: err.message})
    } else{
      response.status(500).json({message:"Internal Server Error"})
    }
  }
}