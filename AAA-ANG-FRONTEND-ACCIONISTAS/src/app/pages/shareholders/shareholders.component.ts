import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/model/state.model';
import { Store } from '@ngrx/store';
import { Shareholders } from 'src/app/model/shareholders.model';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { ngxCsv } from 'ngx-csv';
import * as FileSaver from 'file-saver';
import { Subscription } from 'rxjs';
import { ShareholdersService } from 'src/app/services/shareholders/shareholders.service';
import { ShareholderharedDataService } from 'src/app/services/shareholders/shareholderSharedData.service';
import { UpdateStateShareholder, exportCsvShareholder, exportExcelShareholder, exportPdfShareholder } from 'src/app/store/actions/shareholder.action';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Filtro, TablaCargar, TipoOrder } from 'src/app/interfaces/shareholders.interface';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-shareholders',
  templateUrl: './shareholders.component.html',
  styleUrls: ['./shareholders.component.css']
})
export class ShareholdersComponent implements OnInit {


  loadings: boolean = false;
  loadingsTable: boolean = false;
  cols: any[] = [];
  exportColumns: any[];
  shareholdersListState: Shareholders[];
  globalFilters = ['TIPO_ACCIONISTA', 'TIPO_PERSONA', 'TIPO_DECLARANTE', 'TIPO_DOCUMENTO', 'IDENTIFICACION', 'FECHA_EXPEDICION', 'LUGAR_EXPEDICION', 'PRIMER_NOMBRE', 'SEGUNDO_NOMBRE', 'PRIMER_APELLIDO', 'SEGUNDO_APELLIDO', 'EMPRESA', 'REPRESENTANTE', 'DIRECCION', 'TELEFONO_1', 'TELEFONO_2', 'EMAIL_1', 'EMAIL_2', 'PAIS', 'DEPARTAMENTO', 'CIUDAD', 'BANCO', 'TIPO_CUENTA', 'NRO_CUENTA', 'NACIONALIDAD']
  shareholderSeleccionado: Shareholders;
  totRegistros: number = 0;
  suscription: Subscription;
  viewForm: boolean = false;
  tablaCargar: TablaCargar = {
    first: 0,
    rows: 50,
    orderCampo: undefined,
    tipoOrder: TipoOrder.ASC
  };
  action: string;

  constructor(
    private store: Store<State>,
    private shareholdersService: ShareholdersService,
    private shareholderharedDataService: ShareholderharedDataService,
    private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.store.dispatch(UpdateStateShareholder());
    this.shareholdersService.getShareholdersList().subscribe(shareholders => {
      
      if (shareholders) {
        this.loadings = true
        this.shareholdersListState = shareholders.rows;
        this.totRegistros = shareholders.count;
        this.loadingsTable = false;
      }
    }, error => {
      this.loadingsTable = false;
    })
    this.getShareholdersList();
    this.shareholderharedDataService.getData().subscribe(data => {
      const encryptedDataFromLocalStorage = localStorage.getItem('shareholderDataInterface');
      if (encryptedDataFromLocalStorage) {
        // Descifrar la cadena cifrada utilizando la clave secreta
        const decryptedData = CryptoJS.AES.decrypt(encryptedDataFromLocalStorage, environment.secretKey);
        // Convertir la cadena descifrada en un objeto JSON
        const decryptedDataAsString = decryptedData.toString(CryptoJS.enc.Utf8);
        const decryptedObject = JSON.parse(decryptedDataAsString);

        this.viewForm = decryptedObject ? decryptedObject.viewForm : false;

        if (!this.viewForm) {
          this.shareholderSeleccionado = undefined;
        }
        this.action = data.task;
      }
    })

    this.cols = [
      { field: "TIPO_ACCIONISTA", header: "TIPO_ACCIONISTA" },
      { field: "TIPO_PERSONA", header: "TIPO_PERSONA" },
      { field: "TIPO_DECLARANTE", header: "TIPO_DECLARANTE" },
      { field: "TIPO_DOCUMENTO", header: "TIPO_DOCUMENTO" },
      { field: "IDENTIFICACION", header: "IDENTIFICACION" },
      { field: "FECHA_EXPEDICION", header: "FECHA_EXPEDICION" },
      { field: "LUGAR_EXPEDICION", header: "LUGAR_EXPEDICION" },
      { field: "PRIMER_NOMBRE", header: "PRIMER_NOMBRE" },
      { field: "SEGUNDO_NOMBRE", header: "SEGUNDO_NOMBRE" },
      { field: "PRIMER_APELLIDO", header: "PRIMER_APELLIDO" },
      { field: "SEGUNDO_APELLIDO", header: "SEGUNDO_APELLIDO" },
      { field: "EMPRESA", header: "EMPRESA" },
      { field: "REPRESENTANTE", header: "REPRESENTANTE" },
      { field: "DIRECCION", header: "DIRECCION" },
      { field: "TELEFONO_1", header: "TELEFONO_1" },
      { field: "TELEFONO_2", header: "TELEFONO_2" },
      { field: "EMAIL_1", header: "EMAIL_1" },
      { field: "EMAIL_2", header: "EMAIL_2" },
      { field: "PAIS", header: "PAIS" },
      { field: "DEPARTAMENTO", header: "DEPARTAMENTO" },
      { field: "CIUDAD", header: "CIUDAD" },
      { field: "BANCO", header: "BANCO" },
      { field: "TIPO_CUENTA", header: "TIPO_CUENTA" },
      { field: "NRO_CUENTA", header: "NRO_CUENTA" },
      { field: "NACIONALIDAD", header: "NACIONALIDAD" },
    ];
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));

    this.suscription = this.shareholdersService.refresh$.subscribe(() => {
      this.getShareholdersList();
    })

  }

  getShareholdersList(): void {
    this.shareholdersService.fetchShareholdersList();
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

    this.shareholdersService.setPaginador(this.tablaCargar)

    this.getShareholdersList();
  }

  handleEditShareholder() {
    if (this.shareholderSeleccionado) {
      this.updateShareholder(this.shareholderSeleccionado)
    } else {
      this.confirmationService.confirm({
        key: 'accionista',
        header: 'Advertencia',
        message: "Debes seleccionar primero un accionista",
        icon: 'pi pi-info-circle',
        acceptLabel: 'Aceptar',
        rejectVisible: false
      })
    }
  }

  newShareholder() {
    this.shareholderharedDataService.setData(true, 'new');
  }

  updateShareholder(shareholderData: Shareholders) {
    this.shareholderharedDataService.setData(true, 'edit');
    this.shareholderharedDataService.setIdShareholder(shareholderData.ID_REGISTRO);
  }

  exportExcel() {
    this.store.dispatch(exportExcelShareholder({ paginador: this.tablaCargar }));
  }

  exportCsv() {
    this.store.dispatch(exportCsvShareholder({ paginador: this.tablaCargar}));    
  }
  

  exportPdf() {
    this.store.dispatch(exportPdfShareholder({ paginador: this.tablaCargar}));    
  }


}
