import { Request, Response } from "express"
import { registerTable } from "../../domain/usecases/table.usecase.js"
import { tablePrismaRepository } from "../../infrastructure/database/prisma/tablePrisma.repository.js"
import type { createTableDTO } from "../dto/table.dto.js"

const tableRepository = new tablePrismaRepository

export async function handlerCreateTable(request: Request, response: Response) {
  try {
    const tableData:createTableDTO = request.body
 
    const newTable = await registerTable(tableRepository, tableData)
    if(!newTable){
      response.status(400).json({message: "Table not created"})
      return
    }
    response.status(201).json({
      message: "Table created successfully",
      table:newTable.toPlainObject()
    })
  } catch (err) {
    if(err instanceof Error && err.message === "Cant create new Table"){
      response.status(400).json({message: err.message})
    }else{
      response.status(500).json({message: "Internal server error"})
    }
  }
}