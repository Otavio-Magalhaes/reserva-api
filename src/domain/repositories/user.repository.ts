import type { User } from "../entities/user.entity.js"

export abstract class UserRepository{
  async create(user:User): Promise<User | null>{
    throw new Error('Method not Implemented.')
  }

  async findByEmail(email:string): Promise<{ id: string; name: string; email: string; role: string } | null>{
    throw new Error('Method not Implemented.')
  }

   async findById(id:string): Promise<{ id: string; name: string; email: string; role: string } | null>{
    throw new Error('Method not Implemented.')
  }
}