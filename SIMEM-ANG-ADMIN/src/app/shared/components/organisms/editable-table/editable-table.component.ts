import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { FilterService, MessageService, SelectItem } from "primeng/api";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { Table, TableModule } from "primeng/table";
import { ClearFilterTableComponent } from "../../atoms/clear-filter-table/clear-filter-table.component";
import { InputSwitchModule } from "primeng/inputswitch";
import { DialogModule } from "primeng/dialog";
import { EditableTableService } from "./editable-table.service";
import { ToastModule } from "primeng/toast";

export type EditableColumnSelect<T> = {
  header: string,
  order?: number,
  field: keyof T,
  type: "select",
  options: SelectItem[],
  editable?: boolean
}

export type EditableColumnBasic<T> = {
  header: string,
  order?: number,
  field: keyof T,
  type: "text" | "number" | "calendar" | "switch"
}

export type EditableColumnList<T> = {
  field: keyof T,
  header: string,
  type: "list",
  listField: string,
  titleField: keyof T
  order?: number
}

export type EditableColumn<T> =
  EditableColumnSelect<T> | EditableColumnBasic<T> | EditableColumnList<T>;

export type Columns<T> = { [k in keyof T]?: EditableColumn<T> }

export type LocalT<T> = { [key in keyof T]?: T[key] | SelectItem }

export type IForm<T> = { [key in keyof T]?: any }

export type CustomError = {
  code: string,
  message: string
}

@Component({
  selector: 'editable-table',
  standalone: true,
  templateUrl: 'editable-table.component.html',
  styleUrl: 'editable-table.component.scss',
  imports: [
    TableModule,
    CommonModule,
    MatIconModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    InputNumberModule,
    ClearFilterTableComponent,
    ReactiveFormsModule,
    InputSwitchModule,
    FormsModule,
    DialogModule,
    ToastModule
  ],
  providers: [
    FilterService,
    MessageService
  ]
})
export class EditableTable<T> implements OnInit, OnChanges, AfterViewInit {
  //properties
  @Input({ required: true }) entityName!: string
  @Input({ required: true }) columns!: Columns<T>;
  @Input({ required: false }) data!: T[]
  @Input({ required: false }) headerDeltas!: boolean;
  @Input() bulk = false;
  @Input() download = false;
  @Input() delete = false;
  @Input() create = true;
  @Input() edit = true;
  @Input() createFormGroup!: FormGroup<IForm<T>>
  @Input() editFormGroup!: FormGroup<IForm<T>>
  @Input() orderabledRows = false
  @Input() errors?: CustomError[]

  //emitters
  @Output() onEdit = new EventEmitter<T>();
  @Output() onDelete = new EventEmitter<T>();
  @Output() onCreate = new EventEmitter<T>();
  @Output() onFetchData = new EventEmitter<void>();
  @Output() onSaveBulkData = new EventEmitter<T[]>();

  //local properties
  columnsData?: EditableColumn<T>[]
  localData: LocalT<T>[] = []
  adding = false;
  isEditing = false
  valid = true
  formGroup: FormGroup<IForm<T>> = this.formBuilder.group({})
  submitted = false
  modalVisibility = false
  modalTitle?: string
  modalList?: string[]

  @ViewChild(Table, { read: Table }) pTable?: Table

  constructor(private formBuilder: FormBuilder, private filterService: FilterService, private ediTableService: EditableTableService<T>, private messageService: MessageService) { }

  ngOnInit(): void {
    if (!this.bulk) this.onFetchData.emit();
    this.filterService.register("listFilter", this.ediTableService.listFilter)
  }

  ngAfterViewInit(): void {
    if (this.bulk) this.initAddRow()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["columns"]) {
      this.columnsData = []
      for (let i in this.columns) {
        if (this.columns[i])
          this.columnsData.push(this.columns[i] as EditableColumn<T>)
      }

      this.columnsData.sort((a, b) => {
        if (a.order && b.order) return a.order - b.order
        return 0
      })
    }

    if (changes["data"]) {
      this.localData = []
      this.data?.forEach((a, i) => {
        const row: LocalT<T> = { key: i, ...a }
        this.columnsData?.forEach((b) => {
          if (b.type == "select") {
            const mapper = new Map()
            b.options?.forEach(option => mapper.set(option.value, option.label))
            const newValue: SelectItem = { value: row[b.field], label: mapper.get(row[b.field]) }
            row[b.field] = newValue
          }
        })
        this.localData.push(row)
      })
    }
  }

  getListField(list: unknown[], listField: string) {
    return list?.map(a => (a as any)[listField])
  }

  String(value: unknown) {
    return String(value)
  }

  clearFilters(table: Table) {
    table.clear()
  }

  showModal(title: string, list: string[]) {
    this.modalTitle = title
    this.modalList = list
    this.modalVisibility = true
  }

  initAddRow() {
    const newRow: LocalT<T> = {}
    this.formGroup = this.createFormGroup
    this.formGroup?.reset()
    for (let column of this.columnsData ?? []) {
      if (column.type == "switch") {
        this.formGroup.get(String(column.field))?.setValue(false as any)
      } else if (column.type == "select") {
        newRow[column.field] = { label: "N/A", value: null } as SelectItem
      } else {
        newRow[column.field] = null as any
      }
    }
    this.localData.unshift({ ...newRow, key: -1 })
    if (this.pTable) {
      this.pTable.editingRowKeys = {
        [-1]: true
      }
    }
    this.adding = true;

    if (this.pTable) {
      this.pTable.sortField = 'key'
      this.pTable.sortOrder = 1
      this.pTable.sortSingle()
      this.pTable.reset()
      this.pTable.value = this.localData
    }
  }

  initEditableRow(row: LocalT<T>) {
    this.formGroup = this.editFormGroup
    for (let key in this.formGroup?.value as T) {
      if (typeof row[key] === 'object' && !(row[key] instanceof Date || row[key] instanceof Array)) {
        this.formGroup.get(key)?.setValue((row[key] as SelectItem)?.value)
      }
      else {
        this.formGroup.get(key)?.setValue(row[key] as any)
      }
    }
    this.isEditing = true
  }

  cancel() {
    if (this.adding) this.localData.shift()
    this.adding = false
    this.isEditing = false
    this.submitted = false
  }

  createRowBulk() {
    this.adding = false
    this.localData.shift()
    this.localData.unshift(this.ediTableService.TtoLocal(this.formGroup.value as T, this.columnsData, this.localData.length))
    this.pTable?.reset()
    this.submitted = false;
  }

  editRowBulk(row: LocalT<T>) {
    let newRow = {} as LocalT<T>
    const newT = this.ediTableService.LocalToT(row)
    for (let i in newT) {
      if (this.formGroup.get(i)) {
        newT[i] = this.formGroup.get(i)?.value as any
      }
    }
    newRow = this.ediTableService.TtoLocal(newT, this.columnsData, (row as any)['key'])
    this.localData.splice(this.localData.findIndex((a: any) => a['key'] == (row as any)['key']), 1, newRow)
    this.isEditing = false
  }

  createRow() {
    this.adding = false
    this.localData.shift()
    this.onCreate.emit(this.formGroup.value as T)
    this.submitted = false;
  }

  editRow(row: LocalT<T>) {
    let newRow = this.ediTableService.LocalToT(row)
    for (let i in newRow) {
      if (this.formGroup.get(i)) {
        newRow[i] = this.formGroup.get(i)?.value as any
      }
    }
    this.onEdit.emit(newRow)
    this.isEditing = false
    this.submitted = false;
  }

  deleteRow(row: T) {
    if (this.bulk) this.localData.splice(this.localData.findIndex((a: any) => a['key'] == (row as any)['key']), 1)
    else this.onDelete.emit(row)

  }

  validateForm(rowData: T, html: any) {    
    this.submitted = true
    this.formGroup.updateValueAndValidity()
    if (this.errors) {
      this.errors.forEach(a => {
        for (const controlName in this.formGroup.controls) {
          const control = this.formGroup.get(controlName);
          if (control && control.errors && control.errors[a.code]) {
            this.messageService.add({ severity: "error", key: "EditableTableToast", summary: "Error", detail: a.message })
            break
          }
        }
      })
    }

    if (this.formGroup.valid) {
      this.pTable?.saveRowEdit(rowData, html)
      if (this.bulk && this.adding) this.createRowBulk()
      else if (this.bulk && this.isEditing) this.editRowBulk(rowData)
      else if (this.adding) this.createRow()
      else if (this.isEditing) this.editRow(rowData)
    }
  }

  saveBulkData() {
    this.onSaveBulkData.emit(this.localData.map(a => this.ediTableService.LocalToT(a)))
  }

  exportCSV() {
    const replacer = (_key: string, value: string) => (value === null ? '' : value); // specify how you want to handle null values here
    if (this.data) {
      const csv = this.data.map((row) => {
        return this.columnsData?.map(a => JSON.stringify(row[a.field], replacer)).join(",")
      }

      );
      csv.unshift(this.columnsData?.map(a => a.field).join(','));
      const csvArray = csv.join('\r\n');

      const a = document.createElement('a');
      const blob = new Blob([csvArray], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      a.href = url;
      a.download = this.entityName + '.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    }

  }
}
