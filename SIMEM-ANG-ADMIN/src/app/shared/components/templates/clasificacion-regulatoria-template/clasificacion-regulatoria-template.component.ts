import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackButtonComponent } from '../../atoms/back-button/back-button.component';
import { RegulatoryClassificationModel } from '../../../../store/model/regulatory-classification.model';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { CommomDropdown } from '../../../helpers/common-dropdown';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Columns, CustomError, EditableTable, IForm } from '../../organisms/editable-table/editable-table.component';
import { ToastModule } from "primeng/toast";


@Component({
  selector: 'clasificacion-regulatoria-template',
  templateUrl: './clasificacion-regulatoria-template.component.html',
  styleUrl: './clasificacion-regulatoria-template.component.scss',
  standalone: true,
  imports: [
    BackButtonComponent,
    CommonModule,
    EditableTable,
    CardModule,
    ToastModule
  ]
})
export class ClasificacionRegulatoriaTemplateComponent {
  @Input() dataRegulatoryClassification: RegulatoryClassificationModel[] = [];
  @Output() addRegulatoryClassification = new EventEmitter<RegulatoryClassificationModel>();
  @Output() updateRegulatoryClassification = new EventEmitter<RegulatoryClassificationModel>();
  @Output() onFetch = new EventEmitter<void>()
  headerDeltas: boolean = true;
  errors : CustomError[] = [{
    code:"deltaInicial",
    message:"Debe ingresar por lo menos un valor en delta inicial"
  },
  {
    code:"deltaFinal",
    message:"Debe ingresar por lo menos un valor en delta final"
  }
 ];

  constructor(
    private dropdown: CommomDropdown, private formBuilder: FormBuilder
  ) { }

  alMenosUnCampoValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const grupo = control as FormGroup;
    const DeltaFinal = ['deltaFinalAno','deltaFinalSemanas','deltaFinalDiaMes','deltaFinalDias','deltaFinalDiaSemana','deltaFinalMes','deltaFinalMeses','deltaFinalPeriodo','deltaFinalPeriodo'];
    const DeltaInicial = ['deltaInicialAno','deltaInicialDiaMes','deltaInicialDias','deltaInicialDiaSemana','deltaInicialMes','deltaInicialMeses','deltaInicialPeriodo','deltaInicialSemanas']
    const AlmenosUnDeltaInicial = DeltaInicial.some(campo => grupo.get(campo)?.value);
    const AlmenosUnDeltaFinal = DeltaFinal.some(campo => grupo.get(campo)?.value);    

    if (!AlmenosUnDeltaInicial) {              
      DeltaInicial.forEach(campo => {
        grupo.get(campo)?.setErrors({ deltaInicial: true });
      });
    }else{
      DeltaInicial.forEach(campo => {
        grupo.get(campo)?.setErrors(null);
      });
    }
    if (!AlmenosUnDeltaFinal) {         
      DeltaFinal.forEach(campo => {
        grupo.get(campo)?.setErrors({ deltaFinal: true });
      });
    }else{
      DeltaFinal.forEach(campo => {
        grupo.get(campo)?.setErrors(null);
      });
    }
    
  
    return null;
  };

  createForm: IForm<RegulatoryClassificationModel> = {
    codigoDelta: [null],
    descripcion: [null, Validators.required],
    deltaFinalAno: [null],
    deltaFinalDiaMes: [null],
    deltaFinalDias: [null],
    deltaFinalDiaSemana: [null],
    deltaFinalMes: [null],
    deltaFinalMeses: [null],
    deltaFinalPeriodo: [null],
    deltaFinalSemanas: [null],
    deltaInicialAno: [null],
    deltaInicialDiaMes: [null],
    deltaInicialDias: [null],
    deltaInicialDiaSemana: [null],
    deltaInicialMes: [null],
    deltaInicialMeses: [null],
    deltaInicialPeriodo: [null],
    deltaInicialSemanas: [null]
  }

  createFormGroup = this.formBuilder.group(this.createForm, { validators: this.alMenosUnCampoValidator,updateOn: 'blur'});


  columns: Columns<RegulatoryClassificationModel> = {
    idConfiguracionClasificacionRegulatoria: {
      field: "idConfiguracionClasificacionRegulatoria",
      header: "ID",
      type: "text"
    },
    codigoDelta: {
      field: "codigoDelta",
      header: "Código clasificación",
      type: "text"
    },
    descripcion: {
      field: "descripcion",
      header: "Descripción",
      type: "text"
    },
    fechaCreacion: {
      field: "fechaCreacion",
      header: "Fecha creación",
      type: "calendar"
    }
    , deltaInicialDiaMes: {
      field: "deltaInicialDiaMes",
      header: "Día específico",
      type: "select",
      options: this.dropdown.GetDays()
    },
    deltaInicialDiaSemana: {
      field: "deltaInicialDiaSemana",
      header: "Dia de la semana especifico",
      type: "select",
      options: this.dropdown.GetWeekDays()
    },
    deltaInicialMes: {
      field: "deltaInicialMes",
      header: "Mes especifico",
      type: "select",
      options: this.dropdown.GetMonths()
    },
    deltaInicialDias: {
      field: "deltaInicialDias",
      header: "Días",
      type: "text"
    },
    deltaInicialSemanas: {
      field: "deltaInicialSemanas",
      header: "Semanas",
      type: "text"
    },
    deltaInicialMeses: {
      field: "deltaInicialMeses",
      header: "Meses",
      type: "text"
    },
    deltaInicialAno: {
      field: "deltaInicialAno",
      header: "Años",
      type: "text"
    }, deltaInicialPeriodo: {
      field: "deltaInicialPeriodo",
      header: "Periodo",
      type: "select",
      options: this.dropdown.getPeriodos()
    },
    deltaFinalDiaMes: {
      field: "deltaFinalDiaMes",
      header: "Día específico",
      type: "select",
      options: this.dropdown.GetDays()
    },
    deltaFinalDiaSemana: {
      field: "deltaFinalDiaSemana",
      header: "Dia de la semana especifico",
      type: "select",
      options: this.dropdown.GetWeekDays()
    },
    deltaFinalMes: {
      field: "deltaFinalMes",
      header: "Mes especifico",
      type: "select",
      options: this.dropdown.GetMonths()
    },
    deltaFinalDias: {
      field: "deltaFinalDias",
      header: "Días",
      type: "text"
    },
    deltaFinalSemanas: {
      field: "deltaFinalSemanas",
      header: "Semanas",
      type: "text"
    },
    deltaFinalMeses: {
      field: "deltaFinalMeses",
      header: "Meses",
      type: "text"
    },
    deltaFinalAno: {
      field: "deltaFinalAno",
      header: "Años",
      type: "text"
    }, deltaFinalPeriodo: {
      field: "deltaFinalPeriodo",
      header: "Periodo",
      type: "select",
      options: this.dropdown.getPeriodos()
    }
  }

  fetch() {
    this.onFetch.emit()
  }

  createLabel(label: RegulatoryClassificationModel) {
    label.fechaCreacion = new Date();
    this.addRegulatoryClassification.emit(label)
  }

  editLabel(label: RegulatoryClassificationModel) {
    this.updateRegulatoryClassification.emit(label)
  }


}
