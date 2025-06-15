import { Router } from "express"
import { zodValidator } from "../../infrastructure/middlewares/zodValidator.js"
import { handlerCreateTable, handlerGetAllTables, handleUpdateTable } from "../controllers/table.controller.js"
import { createTableSchema } from "../schemas/createTable.schema.js"
import { updateTableSchema } from "../schemas/updateTable.schema.js"
import { authMiddleware } from "../../infrastructure/middlewares/authMiddleware.js"
import { isAdmin } from "../../infrastructure/middlewares/isAdmin.js"


const router = Router()


router.post("/api/v1/tables", zodValidator(createTableSchema),authMiddleware, isAdmin, handlerCreateTable)

router.get("/api/v1/tables", authMiddleware, handlerGetAllTables)

router.patch("/api/v1/tables/:id", authMiddleware,zodValidator(updateTableSchema),isAdmin, handleUpdateTable)
export default router