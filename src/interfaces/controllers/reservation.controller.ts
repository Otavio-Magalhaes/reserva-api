import {Request, Response} from "express"
import type { createReservationDTO } from "../dto/reservation.dto.js"
import { createReservation, getAllUserReservation } from "../../domain/usecases/reservation.usecase.js"
import { ReservationPrismaRepository } from "../../infrastructure/database/prisma/reservationPrisma.repository.js"
import { UserPrismaRepository } from "../../infrastructure/database/prisma/userPrisma.repository.js"
import { tablePrismaRepository } from "../../infrastructure/database/prisma/tablePrisma.repository.js"

const reservationRepository = new ReservationPrismaRepository
const userRepository = new UserPrismaRepository
const tableRepository = new tablePrismaRepository
export async function handlerReservation(request:Request, response:Response){
  try {

    const reservationData:createReservationDTO = request.body 
    const newReservation = await createReservation(reservationRepository, userRepository,tableRepository ,reservationData)
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


export async function handlerGetReservations(request:Request,response:Response){
  try {
   const userId = request.user?.id;

    if (!userId) {
      return response.status(401).json({ message: "Unauthorized" });
    }

    const reservations = await getAllUserReservation(reservationRepository, userId);

    return response.status(200).json({
      message: "Reservations fetched successfully",
      reservations: reservations.map(r => r.toPlainObject())
    });
  } catch (err) {
     if (err instanceof Error && err.message === "No reservations found for this user") {
      return response.status(404).json({ message: err.message });
    }
    return response.status(500).json({ message: "Internal Server Error" });
  }
}