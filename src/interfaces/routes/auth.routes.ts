import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { zodValidator } from "../../infrastructure/middlewares/zodValidator.js";
import { loginSchema } from "../schemas/login.schema.js";


const router = Router()

router.post("/api/v1/auth/login",zodValidator(loginSchema) ,login)

export default router