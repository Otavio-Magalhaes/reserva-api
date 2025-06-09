import type {Request, Response } from "express";
import { UserPrismaRepository } from "../../infrastructure/database/prisma/userPrisma.repository.js";
import { registerUser } from "../../domain/usecases/user.usecase.js";

const userRepository = new UserPrismaRepository

export async function createUser(request:Request, response:Response){
  try {
    const userData = request.body

    const newUser = await registerUser(userRepository, userData)


  } catch (err) {
    
  }

}