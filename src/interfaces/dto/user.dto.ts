import type { z } from "zod";
import type { createUserSchema } from "../schemas/createUser.schema.js";

export type CreateUserDTO = z.infer<typeof createUserSchema>;

export type UserWithIdDTO = CreateUserDTO & { id: string };

export type UserWithoutPassword = Omit<UserWithIdDTO, 'password'>