import { Component, OnInit } from '@angular/core';
import { Filtro, TablaCargar, TipoOrder } from 'src/app/interfaces/shareholders.interface';
import { Subscription } from 'rxjs';
import { Seizure } from 'src/app/model/seizure.model';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { State } from 'src/app/model/state.model';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SeizureService } from 'src/app/services/seizure/seizure.service';
import { SeizureSharedDataService } from 'src/app/services/seizure/seizureSharedData.service';
import { environment } from 'src/environments/environment';

import * as CryptoJS from 'crypto-js';
import { UpdateStateSeizure, deleteSeizure } from 'src/app/store/actions/seizure.action';
import { seizureState } from 'src/app/store/reducers/seizure/seizure.reducer';

@Component({
  selector: 'app-Seizure',
  templateUrl: './Seizure.component.html',
  styleUrls: ['./Seizure.component.css']
})
export class SeizureComponent implements OnInit {

  status: seizureState;
  prepareDataSeizure: Seizure = {};
  loadings: boolean = true;
  loadingsTable: boolean = true;
  cols: any[] = [];
  exportColumns: any[];
  seizureListState: Seizure[];
  seizureSeleccionado: Seizure;
  totRegistros: number = 0;
  suscription: Subscription;
  viewForm: boolean = false;
  tablaCargar: TablaCargar = {
    first: 0,
    rows: 50,
    orderCampo: undefined,
    tipoOrder: TipoOrder.ASC
  };
  isAddSeizureOpen: boolean;
  isEditSeizureOpen: boolean;
  action: string;

  constructor(
    private fg: FormBuilder,
    private router: Router,
    private store: Store<State>,
    private _snackBar: MatSnackBar,
    private confirmationService: ConfirmationService,
    private seizureService: SeizureService,
    private seizureSharedDataService: SeizureSharedDataService) { }

  ngOnInit() {
    this.store.dispatch(UpdateStateSeizure());

    this.seizureService.getSeizureList(this.tablaCargar).subscribe(seizure => {
      if (seizure) {
        this.loadings = true
        this.seizureListState = seizure.rows;
        this.totRegistros = seizure.count;
        this.loadingsTable = false;
      }
    }, error => {
      this.loadingsTable = false;
    })

    this.getSeizureList();

    this.cols = [
      { field: "ESTADO_EMBARGO", header: "ESTADO_EMBARGO" },
      { field: "BIEN_EMBARGADO", header: "BIEN_EMBARGADO" },
      { field: "IDENTIFICACION_BENEFICIARIO", header: "IDENTIFICACION_BENEFICIARIO" },
      { field: "TITULO", header: "TITULO" },
      { field: "NOMBRE_ACCIONISTA", header: "NOMBRE_ACCIONISTA" },
      { field: "TIPO_PROCEDENCIA", header: "TIPO_PROCEDENCIA" },
      { field: "FECHA_INICIO", header: "FECHA_INICIO" },
      { field: "FECHA_VENCIMIENTO", header: "FECHA_VENCIMIENTO" },
      { field: "JUZGADO", header: "JUZGADO" },
      { field: "TIPO_AUTO", header: "TIPO_AUTO" },
      { field: "IDENTIFICACION_DEMANDANTE", header: "IDENTIFICACION_DEMANDANTE" },
      { field: "NOMBRE_DEMANDANTE", header: "NOMBRE_DEMANDANTE" },
      { field: "VALOR_EMBARGO", header: "VALOR_EMBARGO" },
      { field: "VALOR_DIVIDENDO", header: "VALOR_DIVIDENDO" },
      { field: "OTRO_VALOR", header: "OTRO_VALOR" },
      { field: "OBSERVACION", header: "OBSERVACION" },
      { field: "ID_REGISTRO", header: "ID_REGISTRO" }
    ];
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));

    this.suscription = this.seizureService.refresh$.subscribe(() => {
      this.getSeizureList();
    })

    this.seizureSharedDataService.getData().subscribe(data => {
      const encryptedDataFromLocalStorage = localStorage.getItem('seizureDataInterface');
      if (encryptedDataFromLocalStorage) {
        // Descifrar la cadena cifrada utilizando la clave secreta
        const decryptedData = CryptoJS.AES.decrypt(encryptedDataFromLocalStorage, environment.secretKey);
        // Convertir la cadena descifrada en un objeto JSON
        const decryptedDataAsString = decryptedData.toString(CryptoJS.enc.Utf8);
        const decryptedObject = JSON.parse(decryptedDataAsString);

        this.viewForm = decryptedObject ? decryptedObject.viewForm : false;

        if (!this.viewForm) {
          this.seizureSeleccionado = undefined;
        }
        this.action = data.task;
      }
    })


    this.store.subscribe(async ({ seizureList }) => {
      this.status = seizureList;

      if (this.status.error || this.status.status === 403) {
        let message = seizureList.error ? seizureList.error : seizureList.msg
        this.snackBar(message, seizureList.status);
      }

      if (this.status.status === 200) {
        let snack = await this.snackBar(seizureList.msg, seizureList.status);

        if (snack) {
          this.store.dispatch(UpdateStateSeizure());
          this.getSeizureList();
        }
      }
    });



  }

  loadCustomers(event: LazyLoadEvent) {

    this.loadingsTable = true;

    const filterValues: Filtro[] = [];

    Object.keys(event.filters).forEach(key => {
      if (event.filters[key].value !== null && event.filters[key].value != "") {
        filterValues.push({
          columna: key,
          valor: event.filters[key].value
        })
      }
    });

    this.tablaCargar = {
      first: event.first,
      rows: event.rows,
      orderCampo: event.sortField,
      tipoOrder: event.sortOrder == 1 ? TipoOrder.ASC : TipoOrder.DESC,
      filtro: filterValues
    };

    this.seizureService.setPaginador(this.tablaCargar)

    this.getSeizureList();
  }

  onRowSelect(event: any) {
    //this.updateAssembly(this.assemblySeleccionado)
  }

  showModalData(type: number) {
    let message;
    let header;

    switch (type) {
      case 1:
        message = this.seizureSeleccionado.BIEN_EMBARGADO;
        header = 'BIEN EMBARGADO';
        break;
      case 2:
        message = this.seizureSeleccionado.NOMBRE_ACCIONISTA;
        header = 'NOMBRE ACCIONISTA';
        break;
      case 3:
        message = this.seizureSeleccionado.TIPO_PROCEDENCIA;
        header = 'TIPO PROCEDENCIA';
        break;
      case 4:
        message = this.seizureSeleccionado.JUZGADO;
        header = 'JUZGADO';
        break;
      case 5:
        message = this.seizureSeleccionado.TIPO_AUTO;
        header = 'TIPO AUTO';
        break;
      case 6:
        message = this.seizureSeleccionado.NOMBRE_DEMANDANTE;
        header = 'NOMBRE DEMANDANTE';
        break;
      case 7:
        message = this.seizureSeleccionado.OBSERVACION;
        header = 'OBSERVACION';
        break;
    }

    this.confirmationService.confirm({
      key: 'DataTable',
      header: header,
      message: message,
      icon: 'pi pi-info-circle',
      acceptLabel: 'Aceptar',
      rejectVisible: false
    })

  }

  getSeizureList(): void {
    this.seizureService.fetchSeizureList();
  }

  newSeizure() {
    this.seizureSharedDataService.setData(true, 'new');
  }

  exportExcel() {
    this.seizureService.exportExcel().subscribe(response => {
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
    let fileName = "Embargos " + fechaFormateada;

    // Crear enlace para descargar el archivo
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    })
  }


  exportCsv() {
    this.seizureService.exportCsv().subscribe(response => {
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
      let fileName = "Embargos " + fechaFormateada + ".csv";

      // Crear enlace para descargar el archivo
      const link = document.createElement('a');
      link.download = fileName;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);


    })
  }


  exportPdf() {
    this.seizureService.exportPdf().subscribe(response => {

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
    let fileName = "Embargos " + fechaFormateada + ".pdf";

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

  handleSeizure() {
    if (this.seizureSeleccionado) {
      this.updateSeizure(this.seizureSeleccionado)
    } else {
      this.confirmationService.confirm({
        key: 'embargo',
        header: 'Advertencia',
        message: "Debes seleccionar primero un embargo.",
        icon: 'pi pi-info-circle',
        acceptLabel: 'Aceptar',
        rejectVisible: false
      })
    }
  }

  updateSeizure(seizure: Seizure) {
    this.seizureSharedDataService.setData(true, 'edit');
    this.seizureSharedDataService.setIdSeizure(seizure.EMBARGO_UUID);
  }

  handleDeleteSeizure() {

    if (this.seizureSeleccionado) {

      this.confirmationService.confirm({
        key: 'Eliminarembargo',
        header: 'Advertencia',
        message: '¿Está seguro que desea Inactivar el embargo al título ' + this.seizureSeleccionado.TITULO + ' ?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: "Aceptar",
        acceptButtonStyleClass: 'p-button-rounded p-button-sm',
        rejectButtonStyleClass: 'p-button-rounded p-button-outlined p-button-sm',
        accept: () => {

          const fechaActual = new Date();

          if (new Date(this.seizureSeleccionado.FECHA_VENCIMIENTO) > fechaActual) {

            this.confirmationService.confirm({
              key: 'embargo',
              header: 'Advertencia',
              message: "La fecha de vencimiento muestra que este embargo aún está activo, no puede eliminarse.",
              icon: 'pi pi-info-circle',
              acceptLabel: 'Aceptar',
              rejectVisible: false
            })

          } else {

            let userPetition = JSON.parse(localStorage.getItem("dataLogin"))

            this.prepareDataSeizure = {
              ID_REGISTRO: this.seizureSeleccionado.EMBARGO_UUID,
              EMAILADMIN: userPetition.email,
              ROLADMIN: userPetition.rol.rol
            }

            this.deleteSeizure(this.prepareDataSeizure);

          }

        }
      });
    } else {
      this.confirmationService.confirm({
        key: 'embargo',
        header: 'Advertencia',
        message: "Debes seleccionar primero un embargo.",
        icon: 'pi pi-info-circle',
        acceptLabel: 'Aceptar',
        rejectVisible: false
      })
    }
  }

  deleteSeizure(seizure: Seizure) {
    this.store.dispatch(deleteSeizure({ seizure: this.prepareDataSeizure }));
  }


  public async snackBar(message, status) {
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


}
