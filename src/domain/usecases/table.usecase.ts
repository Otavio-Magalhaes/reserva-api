import type { createTableDTO, updateTableDTO } from "../../interfaces/dto/table.dto.js"
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

export async function getTables(tableRepository: TableRepository) {
  try {
    const tables = await tableRepository.getAll()
    return tables
  } catch (err) {
    throw new Error("Failed to retrieve tables")
  }
}

export async function updateTable(tableRepository: TableRepository, tableData: updateTableDTO, id: string): Promise <Table | null> {
  try {
    const existingTable = await tableRepository.findById(id)
    if (!existingTable) throw new Error("Table not found")

    const updateProps = {
      ...existingTable.toPlainObject(),
      ...tableData
    }

    const updateTableEntity = new Table(updateProps)
    const updatedTable = await tableRepository.update(updateTableEntity)
    return updatedTable
  } catch (err) {
    console.error("Error updating table in database:", err);
    throw new Error("Could not update table. Please try again later.");
  }
}