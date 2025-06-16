import { Router } from "express";
import { authMiddleware } from "../../infrastructure/middlewares/authMiddleware.js";
import { handlerGetReservations, handlerReservation } from "../controllers/reservation.controller.js";

const router = Router()

router.post("/api/v1/reservations", authMiddleware, handlerReservation)

router.get("/api/v1/reservations", authMiddleware, handlerGetReservations)
export default router