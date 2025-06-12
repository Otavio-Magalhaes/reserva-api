import { Router } from "express";
import userRoutes from "./user.routes.js"
import authRoutes from "./auth.routes.js"
import tableRoutes from "./table.routes.js"

const router = Router()

router.use(userRoutes)
router.use(authRoutes)
router.use(tableRoutes)



export default router