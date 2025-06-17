import type { UserRepository } from "../repositories/user.repository.js";

export class UserValidator{
  constructor(private userRepository: UserRepository){}

  async ensureUserExists(userId:string){
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new Error("User Not Found")
    }
    return user
  }
} 