import {Request, Response} from "express"
import type { loginDTO } from "../dto/auth.dto.js"
import { loginUser } from "../../application/services/login.services.js"
import { UserPrismaRepository } from "../../infrastructure/database/prisma/userPrisma.repository.js"

const userRepository = new UserPrismaRepository()
export async function login(request:Request, response:Response){
  try {
    const loginData: loginDTO  = request.body

    const {tokens, user} = await loginUser(userRepository, loginData)

    response.cookie("refreshToken", tokens.refresh,{
      httpOnly: true,
      secure:true,
      sameSite:true,
      maxAge: 7 * (24 * 60 * 60 * 1000)
    })

    response.status(200).json({
      message: "Login  successfully",
      accessToken: tokens.access,
      user
    })

  } catch (err) {
    console.log(err)
    response.status(500).json({message: "Internal server error"})
  }
} 