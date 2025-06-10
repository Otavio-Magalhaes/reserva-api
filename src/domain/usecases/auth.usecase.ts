import type { loginDTO } from "../../interfaces/dto/auth.dto.js";
import bcrypt from "bcrypt"
import type { UserWithoutPassword } from "../../interfaces/dto/user.dto.js";
import type { UserRepository } from "../repositories/user.repository.js";
import { UserRole } from "../entities/user.entity.js";

export async function verifyCredentials(userRepository:UserRepository, loginData:loginDTO): Promise<UserWithoutPassword | null>{
  try {
    const user = await userRepository.findByEmail(loginData.email)
    if(!user) throw new Error("User not found")

    const passwordMatch = await bcrypt.compare(loginData.password, user.password)
    if(!passwordMatch){
      throw new Error("Incorret password")
    }
    const userWithNoPassword:UserWithoutPassword = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role === "client" ? UserRole.CLIENT : UserRole.ADMIN,
    }
    return userWithNoPassword
  } catch (err) {
    console.log(err)
    throw err
  }
}