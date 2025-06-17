import type { TableRepository } from "../repositories/table.repository.js";


export class TableValidator{
  constructor(private tableRepository: TableRepository){}

  async ensureTableExists(table_id:string){
    const table = await this.tableRepository.findById(table_id)
    if (!table) {
      throw new Error("Table Not Found")
    }
    return table
  }
}