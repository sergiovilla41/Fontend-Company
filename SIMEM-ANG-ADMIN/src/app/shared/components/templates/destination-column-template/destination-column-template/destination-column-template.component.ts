import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { BackButtonComponent } from '../../../atoms/back-button/back-button.component';
import { Columns, EditableTable, IForm } from '../../../organisms/editable-table/editable-table.component';
import { DestinationColumnModel } from '../../../../../store/model/destination-column/destination.column.model';

@Component({
  selector: 'app-destination',
  standalone: true,
  imports: [
    BackButtonComponent,
    CommonModule,
    EditableTable,
    CardModule
  ],
  templateUrl: './destination-column-template.component.html',
  styleUrl: './destination-column-template.component.scss'
})
export class DestinationColumnComponentTemplate {

  @Input() DestinationColumnClassification: DestinationColumnModel[] = [];
  @Output() addDestinationColumnClassification = new EventEmitter<DestinationColumnModel>();
  @Output() updateDestinationColumnClassification = new EventEmitter<DestinationColumnModel>();
  @Output() onFetch = new EventEmitter<void>()
  headerDeltas: boolean = true;

  constructor(
     private formBuilder: FormBuilder
  ) { }

  createForm: IForm<DestinationColumnModel> = {
    nombreColumnaDestino: [null, Validators.required],
    tipoDato: [null],
    atributoVariable: [null],
    variableId: [null],
    estado: [false],
    descripcion: [null, Validators.required],
    fechaActualizacion: [null],
  }

  createFormGroup = this.formBuilder.group(this.createForm)

  columns: Columns<DestinationColumnModel> = {
    idColumnaDestino: {
      field: 'idColumnaDestino',
      header: 'ID Columna Destino',
      type: 'text'
    },
    nombreColumnaDestino: {
      field: 'nombreColumnaDestino',
      header: 'Nombre',
      type: 'text'
    },
    tipoDato: {
      field: 'tipoDato',
      header: 'Tipo de dato',
      type: 'text'
    },
    descripcion: {
      field: 'descripcion',
      header: 'Descripción',
      type: 'text'
    },
    atributoVariable: {
      field: 'atributoVariable',
      header: 'Atributo Variable',
      type: 'text'
    },
    variableId: {
      field: 'variableId',
      header: 'ID Variable',
      type: 'number'
    },
    estado: {
      field: 'estado',
      header: 'Estado',
      type: 'switch'
    },
    fechaCreacion: {
      field: 'fechaCreacion',
      header: 'Fecha de Creación',
      type: 'calendar'
    },
    fechaActualizacion: {
      field: 'fechaActualizacion',
      header: 'Fecha de Actualización',
      type: 'calendar'
    }

  }

  fetch() {
    this.onFetch.emit()
  }

  createDestinationColumn(column: DestinationColumnModel) {

    this.addDestinationColumnClassification.emit(column)
  }

  editDestinationColumn(column: DestinationColumnModel) {
    this.updateDestinationColumnClassification.emit(column)
  }

}
