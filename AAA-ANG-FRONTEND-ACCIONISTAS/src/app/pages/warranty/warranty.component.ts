import { Component, OnInit } from '@angular/core';
import { Filtro, TablaCargar, TipoOrder } from 'src/app/interfaces/shareholders.interface';
import { Subscription } from 'rxjs';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { State } from 'src/app/model/state.model';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

import * as CryptoJS from 'crypto-js';
import { UpdateStateSeizure, deleteSeizure } from 'src/app/store/actions/seizure.action';
import { seizureState } from 'src/app/store/reducers/seizure/seizure.reducer';
import { WarrantyService } from 'src/app/services/warranty/warranty.service';
import { Warranty } from 'src/app/model/warranty.model';
import { WarrantySharedDataService } from 'src/app/services/warranty/warrantySharedData.service';
import { UpdateStateWarranty, deleteWarranty } from 'src/app/store/actions/warranty.action';

@Component({
  selector: 'app-warranty',
  templateUrl: './warranty.component.html',
  styleUrls: ['./warranty.component.css']
})
export class WarrantyComponent implements OnInit {

  status: seizureState;
  prepareDataWarranty: Warranty = {};
  loadings: boolean = true;
  loadingsTable: boolean = true;
  cols: any[] = [];
  exportColumns: any[];
  warrantyListState: Warranty[];
  warrantySeleccionado: Warranty;
  totRegistros: number = 0;
  suscription: Subscription;
  viewForm: boolean = false;
  tablaCargar: TablaCargar = {
    first: 0,
    rows: 50,
    orderCampo: undefined,
    tipoOrder: TipoOrder.ASC
  };
  isAddWarrantyOpen: boolean;
  isEditWarrantyOpen: boolean;
  action: string;

  constructor(private fg: FormBuilder,
    private router: Router,
    private store: Store<State>,
    private _snackBar: MatSnackBar,
    private confirmationService: ConfirmationService,
    private warrantyService: WarrantyService,
    private warrantySharedDataService: WarrantySharedDataService) { }

  ngOnInit() {
    this.store.dispatch(UpdateStateWarranty());

    this.warrantyService.getWarrantyList(this.tablaCargar).subscribe(warranty => {
      if (warranty) {
        this.loadings = true
        this.warrantyListState = warranty.rows;
        this.totRegistros = warranty.count;
        this.loadingsTable = false;
      }
    }, error => {
      this.loadingsTable = false;
    })

    this.getWarrantyList();

    this.cols = [
      { field: "TITULO", header: "TITULO" },
      { field: "ESTADO_GARANTIA", header: "ESTADO_GARANTIA" },
      { field: "FECHA_INICIO", header: "FECHA_INICIO" },
      { field: "FECHA_FIN", header: "FECHA_FIN" },
      { field: "PLAZO", header: "PLAZO" },
      { field: "NOMBRE_TERCERO", header: "NOMBRE_TERCERO" },
      { field: "IDENTIFICACION_TERCERO", header: "IDENTIFICACION_TERCERO" },
      { field: "OBSERVACION", header: "OBSERVACION" },
      { field: "ID_REGISTRO", header: "ID_REGISTRO" }
    ];
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));

    this.suscription = this.warrantyService.refresh$.subscribe(() => {
      this.getWarrantyList();
    })


    this.warrantySharedDataService.getData().subscribe(data => {
      const encryptedDataFromLocalStorage = localStorage.getItem('warrantyDataInterface');
      if (encryptedDataFromLocalStorage) {
        // Descifrar la cadena cifrada utilizando la clave secreta
        const decryptedData = CryptoJS.AES.decrypt(encryptedDataFromLocalStorage, environment.secretKey);
        // Convertir la cadena descifrada en un objeto JSON
        const decryptedDataAsString = decryptedData.toString(CryptoJS.enc.Utf8);
        const decryptedObject = JSON.parse(decryptedDataAsString);

        this.viewForm = decryptedObject ? decryptedObject.viewForm : false;

        if (!this.viewForm) {
          this.warrantySeleccionado = undefined;
        }
        this.action = data.task;
      }
    })

    this.store.subscribe(async ({ warrantyList }) => {
      this.status = warrantyList;

      if (this.status.error || this.status.status === 403) {
        let message = warrantyList.error ? warrantyList.error : warrantyList.msg
        this.snackBar(message, warrantyList.status);
      }

      if (this.status.status === 200) {
        let snack = await this.snackBar(warrantyList.msg, warrantyList.status);

        if (snack) {
          this.store.dispatch(UpdateStateWarranty());
          this.getWarrantyList();
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

    this.warrantyService.setPaginador(this.tablaCargar)

    this.getWarrantyList();
  }

  onRowSelect(event: any) {
    //this.updateAssembly(this.assemblySeleccionado)
  }

  getWarrantyList(): void {
    this.warrantyService.fetchWarrantyList();
  }


  newWarranty() {
    this.warrantySharedDataService.setData(true, 'new');
  }

  handleWarranty() {
    if (this.warrantySeleccionado) {
      this.updateWarranty(this.warrantySeleccionado)
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

  updateWarranty(warranty: Warranty) {
    
    this.warrantySharedDataService.setData(true, 'edit');
    this.warrantySharedDataService.setIdWarranty(warranty.GARANTIA_UUID);
  }


  handleDeleteSeizure() {

    if (this.warrantySeleccionado) {

      this.confirmationService.confirm({
        key: 'Eliminarembargo',
        header: 'Advertencia',
        message: '¿Está seguro que desea Inactivar la garantia al título ' + this.warrantySeleccionado.TITULO + ' ?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: "Aceptar",
        acceptButtonStyleClass: 'p-button-rounded p-button-sm',
        rejectButtonStyleClass: 'p-button-rounded p-button-outlined p-button-sm',
        accept: () => {
          let userPetition = JSON.parse(localStorage.getItem("dataLogin"))
          this.prepareDataWarranty = {
            ID_REGISTRO: this.warrantySeleccionado.GARANTIA_UUID,
            EMAILADMIN: userPetition.email,
            ROLADMIN: userPetition.rol.rol
          }
          this.deleteWarranty(this.prepareDataWarranty);
        }
      });
    } else {
      this.confirmationService.confirm({
        key: 'embargo',
        header: 'Advertencia',
        message: "Debes seleccionar primero una garantía.",
        icon: 'pi pi-info-circle',
        acceptLabel: 'Aceptar',
        rejectVisible: false
      })
    }
  }

  deleteWarranty(warranty: Warranty) {
    
    this.store.dispatch(deleteWarranty({ warranty: this.prepareDataWarranty }));
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

  exportExcel() {
    this.warrantyService.exportExcel().subscribe(response => {
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
    let fileName = "Garantias " + fechaFormateada;

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
    this.warrantyService.exportCsv().subscribe(response => {
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
      let fileName = "Garantias " + fechaFormateada + ".csv";

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
    this.warrantyService.exportPdf().subscribe(response => {

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
    let fileName = "Garantias " + fechaFormateada + ".pdf";

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

  showModalData(type: number) {
    let message;
    let header;

    switch (type) {
      case 1:
        message = this.warrantySeleccionado.NOMBRE_TERCERO;
        header = 'NOMBRE TERCERO';
        break;
      case 2:
        message = this.warrantySeleccionado.OBSERVACION;
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

}
