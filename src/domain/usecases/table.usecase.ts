import type { createTableDTO } from "../../interfaces/dto/table.dto.js"
import { Table } from "../entities/table.entity.js"
import type { TableRepository } from "../repositories/table.repository.js"


export async function registerTable(tableRepository: TableRepository, tableData: createTableDTO) {
  try {
    const table = new Table({
      name: tableData.name,
      capacity: tableData.capacity,
      status: tableData.status 
    })

    return await tableRepository.create(table)
  } catch (err) {
    console.log(err)
    throw new Error("Cant create new Table")
  }
}