import { PrismaClient } from "@prisma/client";
import { TableRepository } from "../../../domain/repositories/table.repository.js";
import { Table } from "../../../domain/entities/table.entity.js";

export const prisma = new PrismaClient()

export class tablePrismaRepository extends TableRepository {
  async create(table: Table): Promise<Table> {
    const createTable = await prisma.table.create(
      { data: table.toPlainObject(), }
    )

    return new Table({
      id: createTable.id,
      name: createTable.name,
      capacity: createTable.capacity,
      status: createTable.status
    })
  }

  async findById(id: string): Promise<Table | null> {
    const table = await prisma.table.findUnique({
      where:{id}
    })

    return table 
    ? new Table({
      id: table.id,
      name: table.name,
      capacity: table.capacity,
      status: table.status
    }):
    null
  }

  async getAll(): Promise<Array<object> | null> {
    const tables = await prisma.table.findMany()

    return tables
  }

  async update(table:Table): Promise<Table | null >{
    const updated = await prisma.table.update({
      where:{id: table.id},
      data: table.toPlainObject()
    })

    return new Table({
      id: updated.id,
      name: updated.name,
      capacity: updated.capacity,
      status: updated.status
    })
  }

  async delete(id:string):Promise<void>{
    await prisma.table.delete({
      where:{id}
    })
  }

}