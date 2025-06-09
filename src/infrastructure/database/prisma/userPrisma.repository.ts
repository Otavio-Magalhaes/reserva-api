import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../../../domain/repositories/user.repository.js";
import  { User } from "../../../domain/entities/user.entity.js";

export const prisma = new PrismaClient()

export class UserPrismaRepository extends UserRepository{
  async create(user: User): Promise<void> {
    return await prisma.user.create({
      data: user.toPlainObject()
    })
  }

  async findById(id: string): Promise<{ id: string; name: string; email: string } | null> {
    return await prisma.user.findUnique({
      where:{id},
      select:{
        id: true,
        name: true,
        email: true,
      }
    })
  }

}