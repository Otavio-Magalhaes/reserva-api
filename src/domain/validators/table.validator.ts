import type { createTableDTO } from "../../interfaces/dto/table.dto.js";
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

  async checkTableStatus(table_id:string):Promise<createTableDTO['status']> {
    const table = await this.tableRepository.findById(table_id)
    if (!table) {
      throw new Error("Table Not Found")
    }
    return table.status
  }

 async updateTableStatus(table_id: string, newStatus: createTableDTO['status']) {
    const table = await this.ensureTableExists(table_id);
    table.status = newStatus;
    await this.tableRepository.update(table); 
 }
}