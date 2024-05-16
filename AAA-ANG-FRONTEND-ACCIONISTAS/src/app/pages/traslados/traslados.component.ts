import { Component, OnInit } from "@angular/core";
import {
  Filtro,
  TablaCargar,
  TipoOrder,
} from "src/app/interfaces/shareholders.interface";
import { FormControl, FormGroup } from "@angular/forms";
import {
  cleanStatusTraslados,
  deleteTranslate,
  editTransferTitle,
  getIncompleteTitles,
  getTitlesListSelector,
  getTraslatesList,
  transferTitle,
} from "src/app/store/actions/traslado.action";

import { ConfirmationService } from "primeng/api";
import { EditActions } from "src/app/components/edit-assembly/edit-assembly.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { State } from "src/app/model/state.model";
import { Store } from "@ngrx/store";
import { Titles } from "src/app/model/titles.model";
import { Traslado } from "src/app/model/traslado.model";
import { TrasladoService } from "src/app/services/traslado/traslado.service";
import { country } from "src/app/store/actions/country.action";

export enum TrasladosActions {
  trasladar = "trasladar",
  resumen = "resumen",
}

export interface AsignarAccion {
  TITULO_ANTERIOR_UUID: string;
  TITULO_NUEVO_UUID: string;
  ACCIONES: number;
  TRASLADO_DIVIDENDO: string | number;
  OBSERVACION: string;
  nuevoConsecutivo: string;
  ID_REGISTRO?: string;
}

@Component({
  selector: "traslados",
  templateUrl: "traslados.component.html",
  styleUrls: ["traslados.component.scss"],
})
export class TrasladosComponent implements OnInit {
  disabled = false;
  traslados: Traslado[];
  totalRecords: number = 10;
  cancelTitles: Titles[] = [];
  titlesSelector: { value: string; TITULO_UUID: string }[] = [];
  incompleteTitles: Titles[] = [];
  action: string = TrasladosActions.trasladar;
  crudAction: boolean = true; //true: create, false: edit
  selectedTitlesToTranslate: { value: string; TITULO_UUID: string }[][] = [];
  dataPerCancelTitle: AsignarAccion[][] = []; //this stands by the data in its respective selectedTitlesToTranslate item
  titulos: Titles[] = [];
  selectedTranslates: Traslado[] = [];
  selectedRows: any[] = [];
  tablaCargar: TablaCargar = {
    first: 0,
    rows: 10,
    orderCampo: undefined,
    tipoOrder: TipoOrder.ASC,
  };

  constructor(
    private store: Store<State>,
    private router: Router,
    private _snackBar: MatSnackBar,
    private confirmationService: ConfirmationService,
    private trasladoService: TrasladoService
  ) {}

  ngOnInit() {
    this.store.subscribe(({ traslados }) => {
      this.traslados = traslados.translates;
      this.totalRecords = traslados.count;
      this.cancelTitles = [
        ...this.cancelTitles,
        ...traslados.incompleteTitles.filter(
          (title) =>
            traslados.cancelTitles.find(
              (cancelTitle) => cancelTitle.TITULO_UUID === title.TITULO_UUID
            ) !== undefined &&
            this.cancelTitles.find(
              (cancelTitle) => cancelTitle.TITULO_UUID === title.TITULO_UUID
            ) === undefined
        ),
      ];
      this.titulos = traslados.titlesListSelector;
      this.titlesSelector = traslados.titlesListSelector.map((titulo) => ({
        value: titulo.TIPO_ACCIONISTA + " " + titulo.CONSECUTIVO,
        TITULO_UUID: titulo.TITULO_UUID,
      }));
      this.incompleteTitles = traslados.incompleteTitles;
      if (traslados.status === 200) {
        this.snackBar(traslados.msg, traslados.status);
        this.store.dispatch(cleanStatusTraslados());
      }
    });

    this.store.dispatch(
      getTraslatesList({
        tablaCargar: { first: 0, rows: 10 },
      })
    );
    this.store.dispatch(getTitlesListSelector());
    this.store.dispatch(getIncompleteTitles());
  }

  public async snackBar(message, status) {
    let panelclass;

    if (status == 200) {
      panelclass = ["background-blue"];
    }
    if (status == 403) {
      panelclass = ["background-red"];
    }
    if (status) {
      this._snackBar.open(message, "Cerrar", {
        duration: 4000,
        verticalPosition: "top",
        panelClass: panelclass,
      });
      return true;
    }
  }

  onEditar() {
    this.crudAction = false;
    this.cancelTitles = [];
    this.dataPerCancelTitle = [];
    this.selectedTitlesToTranslate = [];
    if (this.selectedTranslates.length > 0) {
      this.action = TrasladosActions.resumen;
      this.selectedTranslates.forEach((element, i) => {
        const index = this.cancelTitles.findIndex(
          (finding) =>
            finding.CONSECUTIVO === element.CONSECUTIVO_TITULO_ANTERIOR
        );
        if (index === -1) {
          this.cancelTitles.push({
            CONSECUTIVO: element.CONSECUTIVO_TITULO_ANTERIOR,
            ACCIONES: element.ACCIONES,
            TITULO_UUID: element.TITULO_ANTERIOR_UUID,
          });
          this.dataPerCancelTitle.push([
            {
              TITULO_ANTERIOR_UUID: element.TITULO_ANTERIOR_UUID,
              TITULO_NUEVO_UUID: element.TITULO_NUEVO_UUID,
              ACCIONES: element.ACCIONES,
              TRASLADO_DIVIDENDO: element.TRASLADO_DIVIDENDO,
              OBSERVACION: element.OBSERVACION,
              nuevoConsecutivo: element.CONSECUTIVO_TITULO_NUEVO,
              ID_REGISTRO: element.TRASLADO_UUID,
            },
          ]);
          this.selectedTitlesToTranslate.push([
            {
              value:
                element.TIPO_ACCIONISTA_NUEVO +
                " " +
                element.CONSECUTIVO_TITULO_NUEVO,
              TITULO_UUID: element.TITULO_NUEVO_UUID,
            },
          ]);
        } else {
          this.cancelTitles[index].ACCIONES += element.ACCIONES;
          this.dataPerCancelTitle[index].push({
            TITULO_ANTERIOR_UUID: element.TITULO_ANTERIOR_UUID,
            TITULO_NUEVO_UUID: element.TITULO_NUEVO_UUID,
            ACCIONES: element.ACCIONES,
            TRASLADO_DIVIDENDO: element.TRASLADO_DIVIDENDO,
            OBSERVACION: element.OBSERVACION,
            nuevoConsecutivo: element.CONSECUTIVO_TITULO_NUEVO,
            ID_REGISTRO: element.TRASLADO_UUID,
          });
          this.selectedTitlesToTranslate[index].push({
            value:
              element.TIPO_ACCIONISTA_NUEVO +
              " " +
              element.CONSECUTIVO_TITULO_NUEVO,
            TITULO_UUID: element.TITULO_NUEVO_UUID,
          });
        }
      });
    } else {
      this.confirmationService.confirm({
        header: "Edición de traslado",
        message: "Debe seleccionar solo un traslado para editar.",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Aceptar",
        acceptButtonStyleClass: "p-button-rounded p-button-sm ",
        rejectVisible: false,
      });
    }
  }

  cancelarTitulo() {
    this.crudAction = true;
    this.cancelTitles = [];
    this.dataPerCancelTitle = [];
    this.selectedTitlesToTranslate = [];
  }

  cancelar(i: number) {
    this.cancelTitles.splice(i, 1);
    this.selectedTitlesToTranslate.splice(i, 1);
    this.dataPerCancelTitle.splice(i, 1);
    if (this.cancelTitles.length == 0) {
      this.action = TrasladosActions.trasladar;
      this.crudAction = true;
      this.cancelTitles = [];
      this.dataPerCancelTitle = [];
      this.selectedTitlesToTranslate = [];
    }
  }

  onSelectChange() {
    this.dataPerCancelTitle = [];
    this.selectedTitlesToTranslate.forEach((titleGroup, i) => {
      this.dataPerCancelTitle.push(
        titleGroup.map((title, j) => {
          const initialActions = this.cancelTitles[i].ACCIONES_RESTANTES
            ? this.cancelTitles[i].ACCIONES_RESTANTES
            : this.cancelTitles[i].ACCIONES_RESTANTES;
          let actionSlice = [];
          if (initialActions % titleGroup.length === 0) {
            for (let i = 0; i < titleGroup.length; i++) {
              actionSlice.push(initialActions / titleGroup.length);
            }
          } else {
            for (let i = 0; i < titleGroup.length; i++) {
              actionSlice.push(Math.trunc(initialActions / titleGroup.length));
            }

            let diferencia = Math.round(
              (initialActions / titleGroup.length -
                Math.trunc(initialActions / titleGroup.length)) *
                titleGroup.length
            );
            let index = 0;

            while (diferencia != 0) {
              actionSlice[index]++;
              index++;
              diferencia--;
            }
          }

          return {
            ACCIONES: actionSlice[j],
            OBSERVACION: "",
            TITULO_ANTERIOR_UUID: this.cancelTitles[i].TITULO_UUID,
            TITULO_NUEVO_UUID: title.TITULO_UUID,
            TRASLADO_DIVIDENDO: "No",
            nuevoConsecutivo: title.value.split(" ")[1],
          };
        })
      );
    });
  }

  onIncompleteTitlesChange() {
    this.crudAction = true;
  }

  continuar() {
    let valid = true;
    this.cancelTitles.forEach((el, i) => {
      valid = this.selectedTitlesToTranslate[i] !== undefined;
      if (!valid) return;
    });

    if (valid) {
      this.action = TrasladosActions.resumen;
    }
  }

  loadTraslados($event: { first: number; rows: number; filters?: any }) {
    const filterValues: Filtro[] = [];

    for (let key in $event.filters) {
      if (
        $event.filters[key].value !== null &&
        $event.filters[key].value != ""
      ) {
        if (key == "TIPO_ACCIONISTA_ANTERIOR") {
          if (!isNaN(Number($event.filters[key].value))) {
            
            filterValues.push({
              columna: "CONSECUTIVO_TITULO_ANTERIOR",
              valor: $event.filters[key].value,
            });
          } else {
            filterValues.push({
              columna: key,
              valor: $event.filters[key].value,
            });
          }
        } else if (key == "NOMBRE_ACCIONISTA_TITU_ANTERIOR") {
          if (!isNaN(Number($event.filters[key].value))) {
            filterValues.push({
              columna: "IDENTIFICACION_ACCIONISTA_TITU_ANTERIOR",
              valor: $event.filters[key].value,
            });
          } else {
            filterValues.push({
              columna: key,
              valor: $event.filters[key].value,
            });
          }
        } else if (key == "TIPO_ACCIONISTA_NUEVO") {
          if (!isNaN(Number($event.filters[key].value))) {
            
            filterValues.push({
              columna: "CONSECUTIVO_TITULO_NUEVO",
              valor: $event.filters[key].value,
            });
          } else {
            filterValues.push({
              columna: key,
              valor: $event.filters[key].value,
            });
          }
        } else if (key == "NOMBRE_ACCIONISTA_TITU_NUEVO") {
          if (!isNaN(Number($event.filters[key].value))) {
            filterValues.push({
              columna: "IDENTIFICACION_ACCIONISTA_TITU_NUEVO",
              valor: $event.filters[key].value,
            });
          } else {
            filterValues.push({
              columna: key,
              valor: $event.filters[key].value,
            });
          }
        } else {
          filterValues.push({
            columna: key,
            valor: $event.filters[key].value,
          });
        }
      }
    }

    this.store.dispatch(
      getTraslatesList({
        tablaCargar: {
          first: $event.first,
          rows: $event.rows,
          filtro: filterValues,
        },
      })
    );
  }

  volver() {
    this.router.navigate(["../Administraciontitulos"]);
  }

  asignarAcciones(data: AsignarAccion[]) {
    let index = this.cancelTitles.findIndex(
      (el) => el.TITULO_UUID === data[0].TITULO_ANTERIOR_UUID
    );
    let sum = 0;
    data.forEach((el) => (sum += el.ACCIONES));

    if (
      (this.cancelTitles[index].ACCIONES_RESTANTES
        ? this.cancelTitles[index].ACCIONES_RESTANTES
        : this.cancelTitles[index].ACCIONES) < sum
    ) {
      this.confirmationService.confirm({
        header: "Las acciones superan la cantidad a trasladar",
        message:
          "La cantidad de acciones a trasladar no puede superar el valor total de las acciones del titulo anulado",
        rejectVisible: false,
        acceptVisible: false,
      });
    } else if (data.findIndex((el) => el.OBSERVACION === "") !== -1) {
      this.confirmationService.confirm({
        header: "Las observaciones no deben estar vacías",
        message: "Debe ingresar la observación de cada traslado que realice",
        rejectVisible: false,
        acceptVisible: false,
      });
    } else {
      this.confirmationService.confirm({
        header: "Traslado de acciones",
        message:
          "¿Está seguro de trasladar las acciones del título " +
          this.cancelTitles[index].CONSECUTIVO +
          " al titulo " +
          data.map((el) => el.nuevoConsecutivo).join(", ") +
          "?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Aceptar",
        acceptButtonStyleClass: "p-button-rounded p-button-sm",
        rejectButtonStyleClass:
          "p-button-rounded p-button-outlined p-button-sm",
        accept: () => {
          if (this.crudAction) {
            this.store.dispatch(
              transferTitle({
                acciones: data.map((el) => {
                  delete el.nuevoConsecutivo;
                  return {
                    ...el,
                    TRASLADO_DIVIDENDO: el.TRASLADO_DIVIDENDO === "No" ? 0 : 1,
                  };
                }),
              })
            );
          } else {
            this.store.dispatch(
              editTransferTitle({
                acciones: data.map((el) => {
                  delete el.nuevoConsecutivo;
                  return {
                    ...el,
                    TRASLADO_DIVIDENDO: el.TRASLADO_DIVIDENDO === "No" ? 0 : 1,
                  };
                }),
              })
            );
          }

          this.crudAction = true;

          this.cancelTitles.splice(index, 1);
          this.selectedTitlesToTranslate.slice(index, 1);
          if (this.cancelTitles.length === 0) {
            this.action = TrasladosActions.trasladar;
          }

          this.selectedTranslates = [];
          this.selectedTitlesToTranslate = [];
          this.dataPerCancelTitle = [];
          this.cancelTitles = [];
        },
      });
    }
  }

  exportExcel() {
    this.trasladoService.exportExcel().subscribe((response) => {
      const blob = new Blob([response], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);

      // Cambiar el nombre del archivo
      const fechaActual = new Date();
      const year = fechaActual.getFullYear();
      const month = fechaActual.getMonth() + 1;
      const day = fechaActual.getDate();
      const hours = fechaActual.getHours();
      const minutes = fechaActual.getMinutes();
      const seconds = fechaActual.getSeconds();
      const fechaFormateada = `${year}_${month < 10 ? "0" : ""}${month}_${
        day < 10 ? "0" : ""
      }${day} ${hours < 10 ? "0" : ""}${hours}_${
        minutes < 10 ? "0" : ""
      }${minutes}_${seconds < 10 ? "0" : ""}${seconds}`;
      let fileName = "Traslados " + fechaFormateada;

      // Crear enlace para descargar el archivo
      const link = document.createElement("a");
      link.download = fileName;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  exportCsv() {
    this.trasladoService.exportCsv().subscribe((response) => {
      const csv = response; // Contenido del archivo en formato csv
      // Crear el archivo blob
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      // Cambiar el nombre del archivo
      const fechaActual = new Date();
      const year = fechaActual.getFullYear();
      const month = fechaActual.getMonth() + 1;
      const day = fechaActual.getDate();
      const hours = fechaActual.getHours();
      const minutes = fechaActual.getMinutes();
      const seconds = fechaActual.getSeconds();
      const fechaFormateada = `${year}_${month < 10 ? "0" : ""}${month}_${
        day < 10 ? "0" : ""
      }${day} ${hours < 10 ? "0" : ""}${hours}_${
        minutes < 10 ? "0" : ""
      }${minutes}_${seconds < 10 ? "0" : ""}${seconds}`;
      let fileName = "Traslados " + fechaFormateada + ".csv";

      // Crear enlace para descargar el archivo
      const link = document.createElement("a");
      link.download = fileName;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  exportPdf() {
    this.trasladoService.exportPdf().subscribe((response) => {
      const csv = response; // Contenido del archivo en formato csv
      // Crear el archivo blob
      const blob = new Blob([csv], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Cambiar el nombre del archivo
      const fechaActual = new Date();
      const year = fechaActual.getFullYear();
      const month = fechaActual.getMonth() + 1;
      const day = fechaActual.getDate();
      const hours = fechaActual.getHours();
      const minutes = fechaActual.getMinutes();
      const seconds = fechaActual.getSeconds();
      const fechaFormateada = `${year}_${month < 10 ? "0" : ""}${month}_${
        day < 10 ? "0" : ""
      }${day} ${hours < 10 ? "0" : ""}${hours}_${
        minutes < 10 ? "0" : ""
      }${minutes}_${seconds < 10 ? "0" : ""}${seconds}`;
      let fileName = "Traslados " + fechaFormateada + ".pdf";

      // Crear enlace para descargar el archivo
      const link = document.createElement("a");
      link.download = fileName;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      //window.open(URL.createObjectURL(new Blob([response], {type: 'application/pdf'})));
    });
  }

  onEliminar() {
    
    if (this.selectedTranslates.length == 1) {
      this.confirmationService.confirm({
        header: "Eliminar traslado",
        message: "¿Está seguro que desea eliminar el traslado?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Aceptar",
        acceptButtonStyleClass: "p-button-rounded p-button-sm",
        rejectButtonStyleClass:
          "p-button-rounded p-button-outlined p-button-sm",
        accept: () => {
          this.store.dispatch(
            deleteTranslate({
              ID_REGISTRO: this.selectedTranslates[0].TRASLADO_UUID,
            })
          );
        },
      });
    } else {
      this.confirmationService.confirm({
        header: "Eliminar traslado",
        message: "Solo se permite seleccionar un traslado para eliminar.",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Aceptar",
        acceptButtonStyleClass: "p-button-rounded p-button-sm ",
        rejectVisible: false,
      });
    }
  }
}
