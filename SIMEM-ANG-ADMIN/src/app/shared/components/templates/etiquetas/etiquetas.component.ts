import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Columns, EditableTable, IForm } from "../../organisms/editable-table/editable-table.component";
import { Label } from "../../../../store/model/labels.model";
import { FormBuilder, Validators } from "@angular/forms";
import { BackButtonComponent } from "../../atoms/back-button/back-button.component";

@Component({
  selector: "etiquetas-template",
  standalone: true,
  templateUrl: "etiquetas.component.html",
  styleUrl: "etiquetas.component.scss",
  imports: [
    EditableTable,
    BackButtonComponent
  ]
})
export class EtiquetasTemplate {
  @Input({ required: true }) data!: Label[]
  @Output() onFetch = new EventEmitter<void>()
  @Output() onCreateLabel = new EventEmitter<Label>()
  @Output() onEditLabel = new EventEmitter<Label>()

  constructor(private formBuilder: FormBuilder){}

  createForm: IForm<Label> = {
    estado: [false],
    titulo: ["", Validators.required]
  }
  createFormGroup = this.formBuilder.group(this.createForm)

  editForm: IForm<Label> = {
    estado: [false],
    titulo: ["", Validators.required]
  }
  editFormGroup = this.formBuilder.group(this.editForm)

  columns: Columns<Label> = {
    titulo: {
      field: "titulo",
      header: "Título",
      type: "text"
    },
    generacionArchivos: {
      field: "generacionArchivos",
      type: "list",
      listField: "titulo",
      header: "Conjuntos de datos asociados",
      titleField: "titulo"
    },
    estado: {
      field: "estado",
      header: "Activa",
      type: "switch"
    }
  }

  fetch() {
    this.onFetch.emit()
  }

  createLabel(label: Label){
    this.onCreateLabel.emit(label)
  }

  editLabel(label: Label){
    this.onEditLabel.emit(label)
  }
}
