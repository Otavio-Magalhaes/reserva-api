import { User, UserRole } from "../entities/user.entity.js";
import bcrypt from "bcrypt"
import type { UserPrismaRepository } from "../../infrastructure/database/prisma/userPrisma.repository.js";
import type { CreateUserDTO } from "../../interfaces/dto/user.dto.js";


export async function registerUser(userRepository: UserPrismaRepository, userData: CreateUserDTO):Promise<User> {
  const existingUser = await userRepository.findByEmail(userData.email)
  if (existingUser) {
    throw new Error("Email already registered")
  }
  const saltRounds: number = 10
  const hashedPassword: string = await bcrypt.hash(userData.password, saltRounds)

  const user =  new User({
    email: userData.email,
    password: hashedPassword,
    role: userData.role === "client" ? UserRole.CLIENT : UserRole.ADMIN,
    name: userData.name
  })

  return await userRepository.create(user)


}