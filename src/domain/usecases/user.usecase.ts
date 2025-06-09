import type { UserRepository } from "../repositories/user.repository.js";

export async function registerUser(userRepository: UserRepository, userData:object){
  const existingUser = await userRepository.
}