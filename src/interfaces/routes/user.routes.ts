import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
import { User } from "../../domain/entities/user.entity.js";
import { zodValidator } from "../../infrastructure/middlewares/zodValidator.js";
import { createUserSchema } from "../schemas/createUser.schema.js";

const router = Router()

router.post("/api/v1/users",zodValidator(createUserSchema) , createUser)
export default router