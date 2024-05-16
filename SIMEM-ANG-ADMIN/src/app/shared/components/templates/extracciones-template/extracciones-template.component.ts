import { Component } from "@angular/core";
import { Columns, EditableTable, IForm } from "../../organisms/editable-table/editable-table.component";
import { ExtractionsModel } from "../../../../store/model/extractions.model";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'extracciones-template',
  templateUrl: 'extracciones-template.component.html',
  styleUrl: 'extracciones-template.component.scss',
  standalone: true,
  imports: [
    EditableTable
  ]
})
export class ExtraccionesTemplate {
  data: ExtractionsModel[] = []

  createForm: IForm<ExtractionsModel> = {
    Tema: ['', Validators.required],
    NombreExtraccion: ['', Validators.required],
    Periodicidad: ['', Validators.required],
    IntervaloPeriodicidad: ['', Validators.required],
    FechaDeltaFinal: [Date.now, Validators.required],
    FechaDeltaInicial: [Date.now, Validators.required]
  }

  editForm: IForm<ExtractionsModel> = {
    Tema: ['', Validators.required],
    NombreExtraccion: ['', Validators.required],
    Periodicidad: ['', Validators.required],
    IntervaloPeriodicidad: ['', Validators.required],
    FechaDeltaFinal: [null, Validators.required],
    FechaDeltaInicial: [null, Validators.required]
  }

  createFormGroup = this.formBuilder.group(this.createForm)
  editFormGroup = this.formBuilder.group(this.editForm)

  constructor(private formBuilder: FormBuilder) { }

  columns: Columns<ExtractionsModel> = {
    Tema: {
      field: 'Tema',
      header: 'Tema',
      type: 'text'
    },
    NombreExtraccion: {
      field: 'NombreExtraccion',
      header: 'Nombre Extracción',
      type: 'text'
    },
    Periodicidad: {
      field: 'Periodicidad',
      header: 'Periodicidad',
      type: 'select',
      options: [
        { value: 'Diaria', label: 'Diaria' }
      ]
    },
    IntervaloPeriodicidad: {
      field: 'IntervaloPeriodicidad',
      header: 'Intervalo Periodicidad',
      type: 'select',
      options: [
        { value: 1, label: '1' },
        { value: 0, label: '0' }
      ]
    },
    FechaDeltaInicial: {
      field: 'FechaDeltaInicial',
      header: 'Delta Inicial',
      type: 'calendar'
    },
    FechaDeltaFinal: {
      field: 'FechaDeltaFinal',
      header: 'Delta Final',
      type: 'calendar'
    }
  }

  saveData(data: ExtractionsModel[]){
    console.log(data)
  }
}
