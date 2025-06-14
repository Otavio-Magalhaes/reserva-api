import { PrismaClient } from "@prisma/client";
import { TableRepository } from "../../../domain/repositories/table.repository.js";
import { Table } from "../../../domain/entities/table.entity.js";

export const prisma = new PrismaClient()

export class tablePrismaRepository extends TableRepository{
  async create(table: Table): Promise<Table>{
    const createTable = await prisma.table.create(
      {data: table.toPlainObject(),}
    )
    
    return new Table({
      id: createTable.id,
      name: createTable.name,
      capacity: createTable.capacity,
      status: createTable.status
    })
  }

async getAll(): Promise<Array<object> | null> {
  const tables = await prisma.table.findMany()

  return tables
}
}