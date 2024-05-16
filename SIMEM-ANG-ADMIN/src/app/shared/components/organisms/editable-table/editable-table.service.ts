import { Injectable } from "@angular/core";
import { EditableColumn, LocalT } from "./editable-table.component";
import { SelectItem } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class EditableTableService<T> {
  get listFilter() {
    return (value: { titulo: string }[] | null | undefined, filter: string) => {
      console.log(value, filter)
      if (filter === undefined || filter === null || filter.trim() === '') return true;
      if (value === undefined || value === null) return false;
      return value.find(a => a.titulo.toLowerCase().includes(filter.toLowerCase())) !== undefined
    }
  }

  LocalToT(row: LocalT<T>): T {
    const t = {} as T
    for (let i in row) {
      if (typeof row[i] === 'object' && !(row[i] instanceof Date || row[i] instanceof Array)) {
        t[i] = (row[i] as SelectItem)?.value
      } else {
        t[i] = row[i] as any
      }
    }

    return t
  }

  TtoLocal(row: T, columns: EditableColumn<T>[] = [], key: number): LocalT<T> {
    const local = { ...row, key } as LocalT<T>
    columns.forEach((b) => {
      if (b.type == "select") {
        const mapper = new Map()
        b.options?.forEach(option => mapper.set(option.value, option.label))
        const newValue: SelectItem = { value: row[b.field], label: mapper.get(row[b.field]) }
        local[b.field] = newValue
      }
    })

    return local
  }
}
