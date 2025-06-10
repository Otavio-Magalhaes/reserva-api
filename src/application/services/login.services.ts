import { config } from "../../config/env.js";
import { verifyCredentials } from "../../domain/usecases/auth.usecase.js";
import type { UserPrismaRepository } from "../../infrastructure/database/prisma/userPrisma.repository.js";
import type { loginDTO } from "../../interfaces/dto/auth.dto.js";
import jwt from 'jsonwebtoken'

const JWT_ACCESS_TOKEN_SCRET = config.jwtSecret
const JWT_REFRESH_TOKEN_SCRET = config.jwtRefreshToken


export async function loginUser(userRepository: UserPrismaRepository, loginData: loginDTO) {
  try {
    if (!JWT_ACCESS_TOKEN_SCRET || !JWT_REFRESH_TOKEN_SCRET) {
      throw new Error("JWT secrets are not defined in environment variables.");
    }

    console.log("access:" + JWT_ACCESS_TOKEN_SCRET)
    console.log("refresh:" + JWT_REFRESH_TOKEN_SCRET)
    const user = await verifyCredentials(userRepository, loginData)
    if (!user) {
      throw new Error("User not found")
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }

    const accessToken = jwt.sign(
      payload,
      JWT_ACCESS_TOKEN_SCRET,
      { expiresIn: "1h" }
    )

    const refreshToken = jwt.sign(
      payload,
      JWT_REFRESH_TOKEN_SCRET,
      { expiresIn: "7d" }
    )

    return {
      tokens: {
        access: accessToken,
        refresh: refreshToken
      },
      user
    }

  } catch (err) {
    console.log(err)
    throw err
  }
}