import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { State } from 'src/app/model/state.model';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Shareholders } from 'src/app/model/shareholders.model';
import { Subscription } from 'rxjs';
import { AssemblyService } from 'src/app/services/assembly/assembly.service';
import { ShareholderharedDataService } from 'src/app/services/shareholders/shareholderSharedData.service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { UpdateStateShareholder } from 'src/app/store/actions/shareholder.action';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Filtro, TablaCargar, TipoOrder } from 'src/app/interfaces/shareholders.interface';
import { exportCsvAssembly, exportExcelAssembly, exportPdfAssembly } from 'src/app/store/actions/assembly.action';

@Component({
  selector: 'app-assembly',
  templateUrl: './assembly.component.html',
  styleUrls: ['./assembly.component.css']
})
export class AssemblyComponent implements OnInit {


  loadings: boolean = true;
  loadingsTable: boolean = true;
  cols: any[] = [];
  exportColumns: any[];
  assemblyListState: Shareholders[];
  assemblySeleccionado;
  totRegistros: number = 0;
  suscription: Subscription;
  viewForm: boolean = false;
  tablaCargar: TablaCargar = {
    first: 0,
    rows: 50,
    orderCampo: undefined,
    tipoOrder: TipoOrder.ASC
  };
  isAddAssemblyOpen: boolean;
  isEditAssemblyOpen: boolean;


  constructor(
    private store: Store<State>,
    private assemblyService: AssemblyService,
    private shareholderharedDataService: ShareholderharedDataService,
    private confirmationService: ConfirmationService) {

    this.store.dispatch(UpdateStateShareholder());
  }

  ngOnInit() {

    this.getAssemblyList();
    this.assemblyService.getAssemblyListSubject().subscribe({
      next: (assembly) => {
        if (assembly) {
          this.loadings = true
          this.assemblyListState = assembly.rows;
          this.totRegistros = assembly.count;
          this.loadingsTable = false;
        }
      },
      error: () => this.loadingsTable = false
    })

    this.assemblyService.getIsAddAssemblyOpen().subscribe(isAddAssemblyOpen => {
      this.isAddAssemblyOpen = isAddAssemblyOpen;
    })
    this.assemblyService.getIsEditAssemblyOpen().subscribe(isEditAssemblyOpen => {
      this.isEditAssemblyOpen = isEditAssemblyOpen;
    })


    this.assemblyService.loadIsEditAssemblyOpen()
    this.assemblyService.loadIsAddAssemblyOpen()

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
      { field: "ID", header: "ID" },
      { field: "TIPO", header: "TIPO" },
      { field: "ESTADO", header: "ESTADO" },
      { field: "FECHA_ASAMBLEA", header: "FECHA_ASAMBLEA" },
      { field: "NOTIFICAR_ASISTENTES", header: "NOTIFICAR_ASISTENTES" },
      { field: "ESTADO_NOTIFICACION", header: "ESTADO_NOTIFICACION" },
      { field: "FECHACREA", header: "FECHACREA" },
      { field: "USUARIOCREA", header: "USUARIOCREA" },
      { field: "FECHAEDITA", header: "FECHAEDITA" },
      { field: "USUARIOEDITA", header: "USUARIOEDITA" },
      { field: "OBSERVACION", header: "OBSERVACION" },
      { field: "ASISTENTES", header: "ASISTENTES" },
      { field: "QUORUM", header: "QUORUM" },
      { field: "ID_REGISTRO", header: "ID_REGISTRO" }
    ];
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));

    this.suscription = this.assemblyService.refresh$.subscribe(() => {
      this.getAssemblyList();
    })

  }

  openAddAssembly() {
    this.assemblyService.setIsAddAssemblyOpen(true)
  }

  editAssembly() {
    if (this.assemblySeleccionado) {
      this.assemblyService.setIsEditAssemblyOpen(true)
      this.assemblyService.setToEditAssembly(this.assemblySeleccionado);
    } else {
      this.confirmationService.confirm({
        key: 'assembly',
        header: 'Advertencia',
        message: "Debes seleccionar primero una asamblea",
        icon: 'pi pi-info-circle',
        acceptLabel: 'Aceptar',
        rejectVisible: false
      })
    }
  }


  getAssemblyList(): void {
    this.assemblyService.getAssemblyList(this.tablaCargar);
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

    this.getAssemblyList();
  }


  onRowSelect(event: any) {
    //this.updateAssembly(this.assemblySeleccionado)
  }


  exportExcel() {
    this.store.dispatch(exportExcelAssembly({ paginador: this.tablaCargar }));
  }

  exportCsv() {
    this.store.dispatch(exportCsvAssembly({ paginador: this.tablaCargar }));
  }

  exportPdf() {
    this.store.dispatch(exportPdfAssembly({ paginador: this.tablaCargar }));
  }


}
