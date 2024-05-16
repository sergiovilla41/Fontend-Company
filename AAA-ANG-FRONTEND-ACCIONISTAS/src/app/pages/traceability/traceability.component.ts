import { MatSnackBar } from '@angular/material/snack-bar';
import { State } from 'src/app/model/state.model';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { ngxCsv } from 'ngx-csv';
import * as FileSaver from 'file-saver';
import { Subscription } from 'rxjs';
import { TraceabilityService } from 'src/app/services/traceability/traceability.service';
import { Traceability } from 'src/app/model/traceability.model';
import { Filtro, TablaCargar, TipoOrder } from 'src/app/interfaces/shareholders.interface';
import { UpdateStateShareholder } from 'src/app/store/actions/shareholder.action';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { ShareholderharedDataService } from 'src/app/services/shareholders/shareholderSharedData.service';
import { LazyLoadEvent } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-traceability',
  templateUrl: './traceability.component.html',
  styleUrls: ['./traceability.component.css']
})
export class TraceabilityComponent implements OnInit{

  displayResponsive: boolean = false;
  loadings: boolean = false;
  loadingsTable: boolean = false;
  cols: any[] = [];
  exportColumns: any[];
  traceabilityListState: Traceability[];
  traceabilitySeleccionado;
  totRegistros: number = 0;
  suscription: Subscription;
  viewForm: boolean = false;
  tablaCargar: TablaCargar = {
    first: 0,
    rows: 50,
    orderCampo: undefined,
    tipoOrder: TipoOrder.ASC
  };
  valoresSeleccion = {
    usuario: '',
    fecha: '',
    objeto_nuevo: '',
    objeto_impactado: '',
    evento: '',
  }

  constructor(
    private fg: FormBuilder, 
    private router: Router, 
    private store: Store<State>, 
    private _snackBar: MatSnackBar,
    private traceabilityService: TraceabilityService,
    private shareholderharedDataService: ShareholderharedDataService) {

      this.store.dispatch(UpdateStateShareholder());
    }

  ngOnInit() {

    this.getTraceabilityList();
    this.shareholderharedDataService.getData().subscribe(value => {

      const encryptedDataFromLocalStorage = localStorage.getItem('shareholderDataInterface');
      if (encryptedDataFromLocalStorage) {
        // Descifrar la cadena cifrada utilizando la clave secreta
        const decryptedData = CryptoJS.AES.decrypt(encryptedDataFromLocalStorage, environment.secretKey);
        // Convertir la cadena descifrada en un objeto JSON
        const decryptedDataAsString = decryptedData.toString(CryptoJS.enc.Utf8);
        const decryptedObject = JSON.parse(decryptedDataAsString);

        this.viewForm = decryptedObject ? decryptedObject.viewForm : false;

      }
    });

    this.cols = [
      { field: "FECHA", header: "FECHA" },
      { field: "OBJETO_NUEVO", header: "OBJETO_NUEVO" },
      { field: "OBJETO_IMPACTO", header: "OBJETO_IMPACTO" },
      { field: "EVENTO", header: "EVENTO" },
      { field: "USUARIO", header: "USUARIO" },
    ];
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));

    this.suscription = this.traceabilityService.refresh$.subscribe(() => {
      this.getTraceabilityList();
    })
  }

  getTraceabilityList(): void {
    this.traceabilityService.getTraceabilityList( this.tablaCargar ).subscribe( traceability => {
      if (traceability) {
        this.loadings = true
        this.traceabilityListState = traceability.rows;
        this.totRegistros = traceability.count;
        this.loadingsTable = false;
      }
    }, error => {
      this.loadingsTable = false;
    })
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

    this.getTraceabilityList();
  }


  onRowSelect(event: any) {
      this.valoresSeleccion.usuario = this.traceabilitySeleccionado.USUARIO;
      this.valoresSeleccion.fecha = this.traceabilitySeleccionado.FECHA;
      this.valoresSeleccion.objeto_nuevo = this.traceabilitySeleccionado.OBJETO_NUEVO;
      this.valoresSeleccion.objeto_impactado = this.traceabilitySeleccionado.OBJETO_IMPACTADO;
      this.valoresSeleccion.evento = this.traceabilitySeleccionado.EVENTO;
  }

  mostrarModalEdit() {
    this.displayResponsive = true;
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.traceabilityListState);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "listadoTraceability");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  exportPdf() {
    const doc = new jsPDF('l', 'mm', 'a4');

    const head = [['Id usuario', 'Primer nombre', 'Segundo nombre', 'Primer apellido', 'Segundo apellido', 'Documento', 'Telefono', 'Email']];

    autoTable(doc, {
      head: head,
      body: this.toPdfFormat(),
      didDrawCell: (data) => { },
    });
    doc.save('ListadoUsuarios.pdf');
  }
  toPdfFormat() {
    let data = [];
    for (var i = 0; i < this.traceabilityListState.length; i++) {
      data.push([
        this.traceabilityListState[i].FECHA,
        this.traceabilityListState[i].OBJETO_NUEVO,
        this.traceabilityListState[i].OBJETO_IMPACTO,
        this.traceabilityListState[i].EVENTO,
        this.traceabilityListState[i].USUARIO,
      ]);
    }
    return data;
  }

  exportCsv() {
    var opciones = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Lista de usuarios',
      useBom: true,
      headers: ["Id usuario", "primer nombre", "segundo nombre", "primer apellido", "segundo apellido", "email", "telefono", "documento"],
    };

    new ngxCsv(this.traceabilityListState, "listadoUsuarios", opciones);
  }
}
