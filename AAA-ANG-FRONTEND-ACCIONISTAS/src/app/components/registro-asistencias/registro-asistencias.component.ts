import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditAssemblyService } from '../edit-assembly/edit-assembly.service';
import { RegistroAsistenciasService } from './registro-asistencias.service';
import { Asistencia } from 'src/app/model/asistencia.model';
import { State } from 'src/app/model/state.model';
import { Store } from '@ngrx/store';
import { selectAsistenciaTypes, selectAsistencias, selectTotalAsistencias } from 'src/app/store/selectors/asistencias/asistencia.selector';
import { cleanStatusAsistencias, getAsistencias, getTypeAsistantList, postAsistencia, saveAsistencias } from 'src/app/store/actions/asistencias.action';
import { identificationType } from 'src/app/store/actions/identificationType.action';
import { shareholderList } from 'src/app/store/actions/shareholder.action';
import { getShareholderListDropdown } from 'src/app/store/selectors/shareholder/shareholder.selector';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AssemblyService } from 'src/app/services/assembly/assembly.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Filtro, TablaCargar } from 'src/app/interfaces/shareholders.interface';

@Component({
  selector: 'registro-asistencias',
  templateUrl: 'registro-asistencias.component.html',
  styleUrls: ['registro-asistencias.component.scss']
})

export class RegistroAsistenciasComponent implements OnInit, OnDestroy {
  //Pieces of the Store
  asistencias$ = this.store.select(selectAsistencias)
  totalAsistencias$ = this.store.select(selectTotalAsistencias)
  asistenciaTypes$ = this.store.select(selectAsistenciaTypes)
  tipoDocumento$ = this.store.select((state: State) => state.identificationTypeList.identificationTypeList);
  accionistas$ = this.store.select(getShareholderListDropdown)
  asistenciaData: Asistencia[] = []


  //Behavioral properties
  registeringQuestionType: boolean = false;
  form = this.fb.group({
    nombreAccionista: [null, Validators.required],
    identificacionAsistente: [null, Validators.required],
    tipoAsistente: [null, Validators.required],
    nombreAsistente: [null, Validators.required],
    tipoDocumento: [null, Validators.required],
    identification: [null, Validators.required]
  })
  idAsamblea: string;
  tablaCargar: TablaCargar

  constructor(private editAssemblyService: EditAssemblyService, private registroAsistenciasService: RegistroAsistenciasService, private store: Store<State>,
    private fb: FormBuilder, private confirmationService: ConfirmationService, private assemblyService: AssemblyService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.store.dispatch(getTypeAsistantList());
    this.store.dispatch(identificationType());
    this.store.dispatch(shareholderList());
    this.registroAsistenciasService.getIsNewOpen().subscribe(isIt => this.registeringQuestionType = isIt);
    this.assemblyService.getToEditAssembly().subscribe((assembly: any) => this.idAsamblea = assembly.ID_REGISTRO);
    this.store.subscribe(({asistencia}) => {
      if(asistencia.status === 200){
        this.snackBar(asistencia.msg, asistencia.status);
        this.store.dispatch(cleanStatusAsistencias());
        this.form.reset();
        this.store.dispatch(getAsistencias({ASAMBLEA_UUID: this.idAsamblea, tablaCargar: this.tablaCargar}));
      }
    })
    this.asistencias$.subscribe(asistencias => this.asistenciaData = (asistencias)?[...asistencias.map(e => ({...e}))]:[]);
  }

  ngOnDestroy(): void {
    this.store.dispatch(saveAsistencias({asistencias: this.asistenciaData.map(el => ({...el, ACTIVO: el.isPresent?1:0, isPresent: null}))}))
  }

  loadAsistencias($event: { first: number, rows: number, filters?: any }) {
    const filterValues: Filtro[] = [];

    for (let key in $event.filters) {
      if ($event.filters[key].value !== null && $event.filters[key].value != "") {
        filterValues.push({
          columna: key,
          valor: $event.filters[key].value,
        });
      }
    }

    this.tablaCargar = {
      first: $event.first,
      rows: $event.rows,
      filtro: filterValues
    }

    this.store.dispatch(getAsistencias({
      ASAMBLEA_UUID: this.idAsamblea,
      tablaCargar: this.tablaCargar
    }))
  }

  snackBar(message, status) {
    let panelclass;

    if (status == 200) {
      panelclass = ["background-blue"]
    }
    if (status == 403) {
      panelclass = ["background-red"]
    }
    if (status) {
      this._snackBar.open(message, 'Cerrar', {
        duration: 4000,
        verticalPosition: 'top',
        panelClass: panelclass
      });
      return true;
    }
  }

  registerQuestionType() {
    this.registroAsistenciasService.setIsNewOpen(true);
  }

  nextStep() {
    this.editAssemblyService.setActiveMenuItem('Votaciones')
  }

  cancelar() {
    this.registroAsistenciasService.setIsNewOpen(null);
  }

  exportPdf() {
    this.registroAsistenciasService.exportPdf(this.idAsamblea,this.tablaCargar).subscribe(response => {

    const csv = response; // Contenido del archivo en formato csv
    // Crear el archivo blob
    const blob = new Blob([csv], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Cambiar el nombre del archivo
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth() + 1;
    const day = fechaActual.getDate();
    const hours = fechaActual.getHours();
    const minutes = fechaActual.getMinutes();
    const seconds = fechaActual.getSeconds();
    const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
    let fileName = "Registro de asistentes " + fechaFormateada + ".pdf";

    // Crear enlace para descargar el archivo
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
      //window.open(URL.createObjectURL(new Blob([response], {type: 'application/pdf'})));
    })
  }


  exportCsv() {
    this.registroAsistenciasService.exportCsv(this.idAsamblea,this.tablaCargar).subscribe(response => {
      const csv = response; // Contenido del archivo en formato csv
      // Crear el archivo blob
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      // Cambiar el nombre del archivo
      const fechaActual = new Date();
      const year = fechaActual.getFullYear();
      const month = fechaActual.getMonth() + 1;
      const day = fechaActual.getDate();
      const hours = fechaActual.getHours();
      const minutes = fechaActual.getMinutes();
      const seconds = fechaActual.getSeconds();
      const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
      let fileName = "Registro de asistentes " + fechaFormateada + ".csv";

      // Crear enlace para descargar el archivo
      const link = document.createElement('a');
      link.download = fileName;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);


    })
  }

  exportExcel() {
    this.registroAsistenciasService.exportExcel(this.idAsamblea,this.tablaCargar).subscribe(response => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);

    // Cambiar el nombre del archivo
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth() + 1;
    const day = fechaActual.getDate();
    const hours = fechaActual.getHours();
    const minutes = fechaActual.getMinutes();
    const seconds = fechaActual.getSeconds();
    const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
    let fileName = "Registro de asistentes " + fechaFormateada;

    // Crear enlace para descargar el archivo
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    })
  }



  guardar() {
    if (this.form.valid) {
      this.confirmationService.confirm({
        header: 'Registro de asistencia',
        message: '¿Está seguro de registrar la asistencia?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: "Aceptar",
        acceptButtonStyleClass: 'p-button-rounded p-button-sm',
        rejectButtonStyleClass: 'p-button-rounded p-button-outlined p-button-sm',
        accept: () => {
          this.store.dispatch(postAsistencia({
            asistencia: {
              ACCIONISTA_UUID: this.form.get('nombreAccionista').value,
              ASAMBLEA_UUID: this.idAsamblea,
              IDENTIFICACION: this.form.get('identification').value,
              NOMBRE_COMPLETO: this.form.get('nombreAsistente').value,
              TIPO_ASISTENTE_UUID: this.form.get('tipoAsistente').value,
              TIPO_DOCUMENTO: this.form.get('tipoDocumento').value
            }
          }))
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
}
