import { Request, Response } from "express"
import { deleteTable, getTables, registerTable, updateTable } from "../../domain/usecases/table.usecase.js"
import { tablePrismaRepository } from "../../infrastructure/database/prisma/tablePrisma.repository.js"
import type { createTableDTO, updateTableDTO } from "../dto/table.dto.js"

const tableRepository = new tablePrismaRepository

export async function handlerCreateTable(request: Request, response: Response) {
  try {
    const tableData: createTableDTO = request.body

    const newTable = await registerTable(tableRepository, tableData)
    if (!newTable) {
      response.status(400).json({ message: "Table not created" })
      return
    }
    response.status(201).json({
      message: "Table created successfully",
      table: newTable.toPlainObject()
    })
  } catch (err) {
    if (err instanceof Error && err.message === "Cant create new Table") {
      response.status(400).json({ message: err.message })
    } else {
      response.status(500).json({ message: "Internal server error" })
    }
  }
}

export async function handlerGetAllTables(request: Request, response: Response) {
  try {
    const tables = await getTables(tableRepository)
    if (tables?.length == 0) {
      response.status(200).json({
        message: "No Tables found",
        tables: tables

      })
      return
    }
    response.status(200).json({
      message: "Tables retrieved successfully",
      tables: tables
    })
  } catch (err) {
    if (err instanceof Error && err.message == "Failed to retrieve tables") {
      response.status(500).json({ message: "Failed to retrieve tables" })
    }
    response.status(500).json({ message: "Internal server error" })
  }
}

export async function handleUpdateTable(request: Request, response: Response) {
  try {
    const id = request.params.id
    const tableData: updateTableDTO = request.body
    const result = await updateTable(tableRepository, tableData, id)
    
    response.status(200).json({
      message:"Table updated successfully",
      tableUpdated: result
    })

  } catch (err) {
    if(err instanceof Error && err.message=="Table not found"){
      response.status(404).json({message:"Table Not Found"})
    }else{
      response.status(500).json({message:"Internal Server Error"})
    }
  }
}

export async function handleDeleteTable(request:Request, response:Response){
  try {
    const id = request.params.id
    await deleteTable(tableRepository, id)
    response.status(200).json({ message: "Table deleted successfully" })
  } catch (err) {
    if (err instanceof Error && err.message === "Table not found") {
      response.status(404).json({ message: "Table not found" })
    } else {
      response.status(500).json({ message: "Internal Server Error" })
    }
  }
}