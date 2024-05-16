import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { State } from "src/app/model/state.model";
import { Store } from "@ngrx/store";
import {
  Filtro,
  TablaCargar,
  TipoOrder,
} from "src/app/interfaces/shareholders.interface";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Shareholders } from "src/app/model/shareholders.model";
import { ConfirmationService, LazyLoadEvent } from "primeng/api";
import jsPDF from "jspdf";
import { environment } from "src/environments/environment";
import * as CryptoJS from "crypto-js";
import autoTable from "jspdf-autotable";
import { TitlesService } from "src/app/services/titles/titles.service";
import { Titles } from "src/app/model/titles.model";
import { TitleSharedDataService } from "src/app/services/titles/titleSharedData.service";

import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { CancelTitleComponent } from "./cancelTitle/cancelTitle.component";
import {
  UpdateStateTitle,
  exportCsvTitle,
  exportExcelTitle,
  exportPdfTitle,
} from "src/app/store/actions/title.action";
import { titleState } from "src/app/store/reducers/title/title.reducer";

@Component({
  selector: "app-titles",
  templateUrl: "./titles.component.html",
  styleUrls: ["./titles.component.css"],
})
export class TitlesComponent implements OnInit {
  visible: boolean;
  checked: boolean;
  loadings: boolean = false;
  loadingsTable: boolean = false;
  cols: any[] = [];
  exportColumns: any[];
  titlesListState: Titles[];
  titleSeleccionado;
  totRegistros: number = 0;
  suscription: Subscription;
  viewForm: boolean = false;
  tablaCargar: TablaCargar;
  status: titleState;

  selectedRows: any[] = [];
  // ref: DynamicDialogRef;

  constructor(
    private fg: FormBuilder,
    private router: Router,
    private store: Store<State>,
    private _snackBar: MatSnackBar,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private titlesService: TitlesService,
    private titleSharedData: TitleSharedDataService,
    public ref: DynamicDialogRef
  ) {


  }

  ngOnInit() {
    this.getTitlesList();
    this.titlesService.getPaginador().subscribe(paginador => this.tablaCargar = paginador);
    this.titleSharedData.getData().subscribe((value) => {
      const encryptedDataFromLocalStorage =
        localStorage.getItem("titleDataInterface");
      if (encryptedDataFromLocalStorage) {
        // Descifrar la cadena cifrada utilizando la clave secreta
        const decryptedData = CryptoJS.AES.decrypt(
          encryptedDataFromLocalStorage,
          environment.secretKey
        );
        // Convertir la cadena descifrada en un objeto JSON
        const decryptedDataAsString = decryptedData.toString(CryptoJS.enc.Utf8);
        const decryptedObject = JSON.parse(decryptedDataAsString);

        this.viewForm = decryptedObject ? decryptedObject.viewForm : false;
      }
    });

    this.cols = [
      { field: "TIPO_ACCIONISTA", header: "TIPO_ACCIONISTA" },
      { field: "NOMBRE_ACCIONISTA", header: "NOMBRE_ACCIONISTA" },
      { field: "ESTADO", header: "ESTADO" },
      { field: "ACCIONES", header: "ACCIONES" },
      { field: "FECHA_SUSCRIPCION", header: "FECHA_SUSCRIPCION" },
      { field: "FECHA_EXPEDICION", header: "FECHA_EXPEDICION" },
      { field: "FECHA_ENTREGA", header: "FECHA_ENTREGA" },
      { field: "OBSERVACION", header: "OBSERVACION" },
    ];
    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));

    this.suscription = this.titlesService.refresh$.subscribe(() => {
      this.getTitlesList();
    });
  }

  getTitlesList(): void {
    this.titlesService.loadTitlesList()
    this.titlesService.getTitlesList().subscribe(
      (titles) => {
        if (titles) {
          this.loadings = true;
          this.titlesListState = titles.rows;
          this.totRegistros = titles.count;
          this.loadingsTable = false;
        }
      }
    );
  }

  loadCustomers(event: LazyLoadEvent) {
    this.loadingsTable = true;
    const filterValues: Filtro[] = [];

    Object.keys(event.filters).forEach((key) => {
      if (event.filters[key].value !== null && event.filters[key].value != "") {
        if (key == "NOMBRE_ACCIONISTA") {
          if (!isNaN(Number(event.filters[key].value))) {
            
            filterValues.push({
              columna: "IDENTIFICACION_ACCIONISTA",
              valor: event.filters[key].value,
            });
          } else {
            filterValues.push({
              columna: key,
              valor: event.filters[key].value,
            });
          }
        }

        if (key == "TIPO_ACCIONISTA") {
          if (!isNaN(Number(event.filters[key].value))) {
            filterValues.push({
              columna: "CONSECUTIVO",
              valor: event.filters[key].value,
            });
          } else {
            filterValues.push({
              columna: key,
              valor: event.filters[key].value,
            });
          }
        }

        if (key != "NOMBRE_ACCIONISTA" && key != "TIPO_ACCIONISTA") {
          filterValues.push({
            columna: key,
            valor: event.filters[key].value,
          });
        }
      }
    });

    this.titlesService.setPaginador({
      first: event.first,
      rows: event.rows,
      orderCampo: event.sortField,
      tipoOrder: event.sortOrder == 1 ? TipoOrder.ASC : TipoOrder.DESC,
      filtro: filterValues,
    });

    this.getTitlesList();
  }

  onRowSelect(event: any, row: any) {
    if (event.checked) {
      this.selectedRows.push(row);
    } else {
      const index = this.selectedRows.indexOf(row);
      if (index > -1) {
        this.selectedRows.splice(index, 1);
      }
    }
    this.titleSharedData.setCancelTitle(this.selectedRows);
  }

  goTranslate() {
    this.router.navigate(['../traslados'])
  }

  newShareholder() {
    this.titleSharedData.setData(true, "new");
  }

  EditTitle() {
    if (this.selectedRows.length != 1) {
      this.confirmationService.confirm({
        header: "Edición de títulos",
        message: "Debe seleccionar solo un titulo para editar.",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Aceptar",
        acceptButtonStyleClass: "p-button-rounded p-button-sm ",
        rejectVisible: false,
      });
    } else {
      this.titleSharedData.setData(true, "edit");
      this.titleSharedData.setEditingTitle(this.selectedRows[0])
    }
  }

  updateShareholder(shareholderData: Shareholders) {
    this.titleSharedData.setData(true, "edit");
    this.titleSharedData.setIdTitle(shareholderData.ID_REGISTRO);
  }

  deleteTitle() {
    if (this.selectedRows.length === 1) {
      this.confirmationService.confirm({
        header: "Eliminar título",
        message: "¿Está seguro de querer eliminar el titulo seleccionado?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Aceptar",
        acceptButtonStyleClass: "p-button-rounded p-button-sm ",
        rejectVisible: false,
        accept: () => {

          this.titlesService.deleteTitle({
            USUARIOEDITA: JSON.parse(localStorage.getItem("dataLogin")).email,
            ROLADMIN: JSON.parse(localStorage.getItem("dataLogin")).rol.rol,
            ID_REGISTRO: this.selectedRows[0].TITULO_UUID,

          }).subscribe(async response => {
            if (response.status) {
              

              let message = response.msg

              if (response.status === 403) {
                this.snackBar(message, response.status);
              }

              if (response.status === 200) {
                let snack = await this.snackBar(message, response.status);

                if (await snack) {
                  this.getTitlesList();
                }
              }

            };
          })
        },

      });
    } else {
      this.confirmationService.confirm({
        header: "Eliminar título",
        message: "Solo se permite seleccionar un titulo para eliminar",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Aceptar",
        acceptButtonStyleClass: "p-button-rounded p-button-sm ",
        rejectVisible: false,
      });
    }
  }

  showDialog() {
    if (this.selectedRows.length == 0) {
      this.confirmationService.confirm({
        header: "Anulación de títulos",
        message: "Debe seleccionar al menos un titulo para anular.",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Aceptar",
        acceptButtonStyleClass: "p-button-rounded p-button-sm ",
        rejectVisible: false,
      });
    } else if (this.selectedRows.length > 5) {
      this.confirmationService.confirm({
        header: "Anulación de títulos",
        message: "La selección debe ser máximo de 5 elementos",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Aceptar",
        acceptButtonStyleClass: "p-button-rounded p-button-sm ",
        rejectVisible: false,
      });
    } else {
      this.ref = this.dialogService.open(CancelTitleComponent, {
        header: "Anulación de títulos",
        styleClass: "cancelTitle",
        width: "70%",
        baseZIndex: 10000,
      });

      this.ref.onClose.subscribe(() => {
        this.selectedRows = [];
        localStorage.removeItem("dataCancelTitle");
        this.titlesListState.forEach((element) => {
          element.CHECKED = false;
        });
      });
    }
  }

  onCancelClick() {
    try {
      this.ref.close();
    } catch (e) {
      console.error("Error al cerrar el diálogo:", e);
    }
  }

  exportExcel() {
    this.store.dispatch(exportExcelTitle({ paginador: this.tablaCargar }));
  }

  exportCsv() {
    this.store.dispatch(exportCsvTitle({ paginador: this.tablaCargar }));
  }

  exportPdf() {
    this.store.dispatch(exportPdfTitle({ paginador: this.tablaCargar }));
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
      await this._snackBar.open(message, 'Cerrar', {
        duration: 4000,
        verticalPosition: 'top',
        panelClass: panelclass
      });

      return true;
    }

  }




}
