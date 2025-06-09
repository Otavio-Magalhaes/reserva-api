import type { User } from "../entities/user.entity.js"

export abstract class UserRepository{
  async create(user:User): Promise<void>{
    throw new Error('Method not Implemented.')
  }

  async findByEmail(email:string): Promise<User | null>{
    throw new Error('Method not Implemented.')
  }
  
   async findById(id:string): Promise<Object | null>{
    throw new Error('Method not Implemented.')
  }
}