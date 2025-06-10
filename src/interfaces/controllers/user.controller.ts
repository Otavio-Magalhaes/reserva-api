import type {Request, Response } from "express";
import { UserPrismaRepository } from "../../infrastructure/database/prisma/userPrisma.repository.js";
import { registerUser } from "../../domain/usecases/user.usecase.js";
import type { z } from "zod";
import type { createUserSchema } from "../schemas/createUser.schema.js";
import type { CreateUserDTO } from "../dto/user.dto.js";

const userRepository = new UserPrismaRepository

export async function createUser(request:Request, response:Response){
  try {
    const userData:CreateUserDTO = request.body

    const newUser = await registerUser(userRepository, userData)

    response.status(201).json({
      message: "User created sucessfuly",
      user: newUser.toPlubicObject(),
    })
  } catch (err) {
    if(err instanceof Error && err.message === "Email already registered"){
      response.status(400).json({message: err.message})
    }else{
      response.status(500).json({message: "Internal server error"})
    }
  }

}