import { Component, OnInit } from '@angular/core';
import { LiquidacionBehaviorService } from './liquidacion-behavior.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/model/state.model';
import { selectLiquidacionEstados, selectLiquidacionList, selectTotalRows } from 'src/app/store/selectors/liquidacion/liquidacion.selector';
import { actualizarLiquidacion, cleanLiquidacionState, getLiquidacionEstados, getLiquidacionList, liquidarMasivamente, liquidarPorAccionista } from 'src/app/store/actions/liquidacion.action';
import { FormBuilder, Validators } from '@angular/forms';
import { getShareholderListDropdown } from 'src/app/store/selectors/shareholder/shareholder.selector';
import { shareholderList } from 'src/app/store/actions/shareholder.action';
import { ConfirmationService } from 'primeng/api';
import { AssemblyService } from 'src/app/services/assembly/assembly.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Liquidacion } from 'src/app/model/liquidacion.model';
import { Filtro, TablaCargar } from 'src/app/interfaces/shareholders.interface';
@Component({
  selector: 'liquidacion',
  templateUrl: 'liquidacion.component.html',
  styleUrls: ['liquidacion.component.scss']
})

export class LiquidacionComponent implements OnInit {
  //pieces of state
  liquidaciones$ = this.store.select(selectLiquidacionList);
  totalRecords$ = this.store.select(selectTotalRows);
  accionistas$ = this.store.select(getShareholderListDropdown)
  liquidacionEstados$ = this.store.select(selectLiquidacionEstados)

  idAsamblea: string;
  tipoAccionistas = ['A', 'B', 'C']

  //behavior attributes
  liquidacionTipos = ['Liquidación masiva', 'Liquidación por accionista']
  action: string = null;
  selectedLiquidacion: Liquidacion;

  form = this.fb.group({
    tipoLiquidacion: [this.liquidacionTipos[0], Validators.required],
    accionista: [],
    numeroCuotas: [],
    tipoAccionista: [],
    estadoLiquidacion: []
  });
  tablaCargar: TablaCargar

  constructor(private liquidacionService: LiquidacionBehaviorService, private store: Store<State>, private fb: FormBuilder, private confirmationService: ConfirmationService,
    private assemblyService: AssemblyService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.store.dispatch(shareholderList())
    this.store.dispatch(getLiquidacionEstados())
    this.assemblyService.getToEditAssembly().subscribe((assembly: any) => this.idAsamblea = assembly.ID_REGISTRO);
    this.liquidacionService.getAction().subscribe(action => this.action = action)
    this.liquidacionService.getSelectedLiquidacion().subscribe(selectedLiquidacion => this.selectedLiquidacion = selectedLiquidacion)

    this.store.subscribe(({ liquidacion }) => {
      if (liquidacion.status) {
        this.liquidacionService.setAction(null)
        this.snackBar(liquidacion.msg, liquidacion.status);
        this.store.dispatch(cleanLiquidacionState())
      }
    })
    this.liquidacionEstados$.subscribe(val => this.form.controls['estadoLiquidacion'].setValue(val?.find(e => e.DESCRIPCION === this.selectedLiquidacion?.ESTADO)))
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

  liquidar() {
    this.liquidacionService.setAction('liquidar')
  }

  editar() {
    if (this.selectedLiquidacion) {
      this.liquidacionService.setSelectedLiquidacion(this.selectedLiquidacion)
      this.liquidacionService.setAction('editar')
    } else {
      this.confirmationService.confirm({
        key: 'liquidacion',
        header: 'Advertencia',
        message: "Debes seleccionar una liquidación",
        icon: 'pi pi-info-circle',
        acceptLabel: 'Aceptar',
        rejectVisible: false
      })
    }
  }

  onEditar() {
    
    this.confirmationService.confirm({
      key: 'liquidacion',
      header: 'Liquidar',
      message: '¿Está seguro de editar la liquidación?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Aceptar",
      acceptButtonStyleClass: 'p-button-rounded p-button-sm',
      rejectButtonStyleClass: 'p-button-rounded p-button-outlined p-button-sm',
      accept: () => {
        this.store.dispatch(actualizarLiquidacion({ESTADO_UUID: this.form.get('estadoLiquidacion').value.ID_REGISTRO, ID_REGISTRO: this.selectedLiquidacion.ID_REGISTRO}))
      }
    })
  }

  anular() {
    if (this.selectedLiquidacion) {
      this.liquidacionService.setSelectedLiquidacion(this.selectedLiquidacion)
      this.liquidacionService.setAction('anular')
    } else {
      this.confirmationService.confirm({
        key: 'liquidacion',
        header: 'Advertencia',
        message: "Debes seleccionar una liquidación",
        icon: 'pi pi-info-circle',
        acceptLabel: 'Aceptar',
        rejectVisible: false
      })
    }

  }

  onAnular(){
    this.confirmationService.confirm({
      key: 'liquidacion',
      header: 'Liquidar',
      message: '¿Está seguro de realizar la liquidación?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Aceptar",
      acceptButtonStyleClass: 'p-button-rounded p-button-sm',
      rejectButtonStyleClass: 'p-button-rounded p-button-outlined p-button-sm',
      accept: () => {
        this.store.dispatch(actualizarLiquidacion({ESTADO_UUID: this.form.get('estadoLiquidacion').value.ID_REGISTRO, ID_REGISTRO: this.selectedLiquidacion.ID_REGISTRO}))
      }
    })
  }

  cancelar() {
    this.liquidacionService.setAction(null)
  }

  exportPdf() {
    this.liquidacionService.exportPdf(this.idAsamblea,this.tablaCargar).subscribe(response => {

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
    let fileName = "Liquidación " + fechaFormateada + ".pdf";

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
    this.liquidacionService.exportCsv(this.idAsamblea,this.tablaCargar).subscribe(response => {
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
      let fileName = "Liquidación " + fechaFormateada + ".csv";

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
    this.liquidacionService.exportExcel(this.idAsamblea,this.tablaCargar).subscribe(response => {
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
    let fileName = "Liquidación " + fechaFormateada;

    // Crear enlace para descargar el archivo
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    })
  }

  loadLiquidaciones($event: { first: number, rows: number, filters?: any }) {
    const filterValues: Filtro[] = [];

    for (let key in $event.filters) {
      if ($event.filters[key].value !== null && $event.filters[key].value != "") {
        if (key == "TIPO_ACCIONISTA") {
          if (!isNaN(Number($event.filters[key].value))) {
            filterValues.push({
              columna: "CONSECUTIVO",
              valor: $event.filters[key].value,
            });
          } else {
            filterValues.push({
              columna: key,
              valor: $event.filters[key].value,
            });
          }
        }else{
          filterValues.push({
            columna: key,
            valor: $event.filters[key].value,
          });
        }

      }
    }

    this.tablaCargar = {
      first: $event.first,
      rows: $event.rows,
      filtro: filterValues
    }

    this.store.dispatch(getLiquidacionList({
      tablaCargar: this.tablaCargar,
      ASAMBLEA_UUID: this.idAsamblea
    }))
  }



  onLiquidar() {
    this.confirmationService.confirm({
      key: 'liquidacion',
      header: 'Liquidar',
      message: '¿Está seguro de realizar la liquidación?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Aceptar",
      acceptButtonStyleClass: 'p-button-rounded p-button-sm',
      rejectButtonStyleClass: 'p-button-rounded p-button-outlined p-button-sm',
      accept: () => {

        if (this.form.get('tipoLiquidacion').value === this.liquidacionTipos[0]) {
          const tipoAccionista = this.form.get('tipoAccionista').value
          if (tipoAccionista === 'A') {
            this.store.dispatch(liquidarMasivamente({ ASAMBLEA_UUID: this.idAsamblea, TIPO_ACCIONISTA: 1 }));
          } else if (tipoAccionista === 'B') {
            this.store.dispatch(liquidarMasivamente({ ASAMBLEA_UUID: this.idAsamblea, TIPO_ACCIONISTA: 2 }));
          } else {
            this.store.dispatch(liquidarMasivamente({ ASAMBLEA_UUID: this.idAsamblea, TIPO_ACCIONISTA: 3 }));
          }
        } else {
          this.store.dispatch(liquidarPorAccionista({ ASAMBLEA_UUID: this.idAsamblea, CUOTAS: parseInt(this.form.get('numeroCuotas').value), TITULO_UUID: this.form.get('accionista').value }));
        }

      }
    })
  }
}
