import type { createTableDTO } from "../../interfaces/dto/table.dto.js"

type statusTable = createTableDTO["status"]


export type TableProps = {
  id?: string
  name: string
  capacity: number
  status: statusTable
}

export class Table {
  public id?: string
  public name: string
  public capacity: number
  public status: statusTable

  constructor(props: TableProps) {
    this.id = props.id
    this.name = props.name
    this.capacity = props.capacity
    this.status = props.status
  }




  toPlainObject() {
    return {
      id: this.id,
      name: this.name,
      capacity: this.capacity,
      status: this.status
    }
  }
}