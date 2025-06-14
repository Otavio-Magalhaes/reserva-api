import type { Table } from "../entities/table.entity.js";

export abstract class TableRepository{
  async create(table: Table): Promise<Table | null>{
    throw new Error('Method not Implemented.')
  }

  async findById(id: string): Promise <Table | null>{
    throw new Error('Method not Implemented.')
  }

  async getAll(): Promise<Array<object> | null>{
    throw new Error('Method not Implemented.')
  }
}