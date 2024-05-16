import { TestBed } from "@angular/core/testing"
import { EditableTable } from "./editable-table.component"
import { User } from "../../../../store/model/User.model"
import { MessageService } from "primeng/api"
import { EditableTableService } from "./editable-table.service"
import { FormGroup } from "@angular/forms"

describe("EditableTable", () => {
  let component: EditableTable<User>
  let service: EditableTableService<User>
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EditableTable,
        MessageService,
        EditableTableService
      ]
    })
    component = TestBed.inject(EditableTable)
    service = TestBed.inject(EditableTableService)
  })

  it("it", () => {
    component.data = []
    component.ngOnInit()
    component.ngOnChanges({ "columns": { currentValue: [], previousValue: [], firstChange: false, isFirstChange: () => false }, "data": { firstChange: false, currentValue: [], isFirstChange: () => false, previousValue: [] } })
    component.cancel()
    component.String("")
    component.exportCSV()
    component.columnsData = [{ field: 'app', header: 'App', type: 'text' }, { field: 'correo', type: 'select', header: 'Correo', options: [{ value: '1', label: 'lunes' }] }]
    component.initAddRow()
    component.initEditableRow({})
    component.bulk = true
    component.ngAfterViewInit()
    component.getListField([{ titulo: "hola" }], "titulo")
    component.showModal("titulo", [""])
    component.formGroup = new FormGroup({})
    component.localData = []
    component.createRowBulk()
    component.editRowBulk({ app: 'hola' })
    component.createRow()
    component.editRow({})
    component.deleteRow({})
    component.validateForm({}, {})
    component.saveBulkData()
  })

  it('service', () => {
    service.LocalToT({ app: { value: 1, label: '1' }, correo: 'hola' })
    service.TtoLocal({ app: 'hola', correo: '1' }, [{ field: 'app', header: 'App', type: 'text' }, { field: 'correo', type: 'select', header: 'Correo', options: [{ value: '1', label: 'lunes' }] }], 1)
    service.listFilter([{ titulo: 'julian' }, { titulo: 'hola' }], 'hola')
  })
})
