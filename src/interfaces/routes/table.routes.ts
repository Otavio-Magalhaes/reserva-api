import { Router } from "express"
import { zodValidator } from "../../infrastructure/middlewares/zodValidator.js"
import { createTableSchema } from "../schemas/createTable.schema.js"
import { handlerCreateTable } from "../controllers/table.controller.js"
import { authMiddleware } from "../../infrastructure/middlewares/authMiddleware.js"
import { isAdmin } from "../../infrastructure/middlewares/isAdmin.js"


const router = Router()


router.post("/api/v1/tables", zodValidator(createTableSchema),authMiddleware, isAdmin, handlerCreateTable)


export default router