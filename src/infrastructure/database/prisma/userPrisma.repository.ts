import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../../../domain/repositories/user.repository.js";
import  { User } from "../../../domain/entities/user.entity.js";
import type { UserWithIdDTO } from "../../../interfaces/dto/user.dto.js";

export const prisma = new PrismaClient()

export class UserPrismaRepository extends UserRepository{
  async create(user: User ): Promise<User> {
     const createdUser = await prisma.user.create({
      data: user.toPlainObject(),
    });
    return new User({
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      password: createdUser.password,
      role: createdUser.role as any,
    });
  }

  async findById(id: string): Promise< UserWithIdDTO | null> {
    return await prisma.user.findUnique({
      where:{id},
      select:{
        id: true,
        name: true,
        email: true,
        role: true
      }
    })
  }


  async findByEmail(email: string): Promise<UserWithIdDTO | null> {
    return await prisma.user.findUnique({
      where:{email},
      select:{
        id:true,
        name:true,
        email:true,
        role:true
      }
    })
  }
}