import { Router } from "express"
import { zodValidator } from "../../infrastructure/middlewares/zodValidator.js"
import { createTableSchema } from "../schemas/createTable.schema.js"
import { handlerCreateTable } from "../controllers/table.controller.js"


const router = Router()


router.post("/api/v1/tables", zodValidator(createTableSchema), handlerCreateTable)


export default router