import { Router } from "express";
import { authMiddleware } from "../../infrastructure/middlewares/authMiddleware.js";
import { handlerReservation } from "../controllers/reservation.controller.js";

const router = Router()

router.post("/api/v1/reservations", authMiddleware, handlerReservation)

export default router