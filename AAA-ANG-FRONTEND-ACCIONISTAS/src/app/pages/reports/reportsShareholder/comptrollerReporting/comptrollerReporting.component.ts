import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComptrollerReporting } from 'src/app/model/comptrollerReporting.model';
import { LazyLoadEvent } from 'primeng/api';
import { Filtro, TablaCargar, TipoOrder } from 'src/app/interfaces/shareholders.interface';
import { ReportsService } from 'src/app/services/reports/reports.service';
import { Subscription } from 'rxjs';
import { State } from "src/app/model/state.model";
import { Store } from "@ngrx/store";
import { exportCsvComptrollerReporting, exportExcelComptrollerReporting, exportPdfComptrollerReporting } from 'src/app/store/actions/reports.action';

@Component({
  selector: 'app-comptrollerReporting',
  templateUrl: './comptrollerReporting.component.html',
  styleUrls: ['./comptrollerReporting.component.css']
})
export class ComptrollerReportingComponent implements OnInit {

  loadings: boolean = true;
  isLoading = false;
  comptrollerReportingListState: ComptrollerReporting[];
  globalFilters = ['FECHACREA', 'NIT_ACCIONISTA', 'NOMBRE_ACCIONISTA', 'CAPITAL_SUSCRITO', 'PORCENTAJE_PARTICIPACION', 'CAPITAL_PAGADO', 'PARTICIPACION_PAGADO', 'TOTAL_ACCIONES']
  totRegistros: number = 0;
  loadingsTable: boolean = true;
  suscription: Subscription;
  tablaCargar: TablaCargar = {
    first: 0,
    rows: 50,
    orderCampo: undefined,
    tipoOrder: TipoOrder.ASC
  };
  yearOptions: number[] = [];
  selectedYear: number = 0;
  isButtonDisabled: boolean = false;
  dateSearch: string = '';


  constructor(private router: Router,
    private reportsService: ReportsService,
    private store: Store<State>
  ) {

    const currentYear = new Date().getFullYear();
    const startYear = 1992;

    for (let year = currentYear; year >= startYear; year--) {
      this.yearOptions.push(year);
    }


  }

  ngOnInit() {
    this.reportsService.getComptrollerShareholderList(this.tablaCargar).subscribe(seizure => {
      if (seizure) {
        this.loadings = true
        this.comptrollerReportingListState = seizure.rows;
        this.totRegistros = seizure.count;
        this.loadingsTable = false;
      }
    }, error => {
      this.loadingsTable = false;
    })

    this.store.subscribe(async ({ reportState }) => {
      this.isLoading = reportState.isLoading;
      this.isButtonDisabled = reportState.isLoading == false ? false : true;
    });

  }


  goBack() {
    this.router.navigate(['../reportesAccionistas'])
  }


  loadCustomers(event: LazyLoadEvent) {

    const currentYear = new Date().getFullYear();

    this.loadingsTable = true;

    const filterValues: Filtro[] = [];

    if (this.selectedYear == 0) {
      this.dateSearch = currentYear.toString();
    } else {
      this.dateSearch = this.selectedYear.toString();
    }

    if (event.filters) {

      Object.keys(event.filters).forEach(key => {

        if (event.filters[key].value !== null && event.filters[key].value != "") {
  
          filterValues.push({
            columna: key,
            valor: event.filters[key].value
          })
  
        }
      });
    }

    filterValues.push({
      columna: 'FECHACREA',
      valor: this.dateSearch
    })

    this.tablaCargar = {
      first: event.first,
      rows: event.rows,
      orderCampo: event.sortField,
      tipoOrder: event.sortOrder == 1 ? TipoOrder.ASC : TipoOrder.DESC,
      filtro: filterValues
    };

    


    this.reportsService.setPaginador(this.tablaCargar)
    this.getComptrollerShareholderList();
  }


  getComptrollerShareholderList(): void {
    this.reportsService.fetchComptrollerShareholderList();
  }


  searchByYear(event: LazyLoadEvent) {
    
    const currentYear = new Date().getFullYear();

    const filterValues: Filtro[] = [];

    if (this.selectedYear) {
      filterValues.push({
        columna: "FECHACREA",
        valor: this.selectedYear.toString()
      });
    } else {
      filterValues.push({
        columna: "FECHACREA",
        valor: currentYear.toString()
      });
    }

    this.tablaCargar = {
      first: event.first,
      rows: event.rows,
      orderCampo: event.sortField,
      tipoOrder: event.sortOrder == 1 ? TipoOrder.ASC : TipoOrder.DESC,
      filtro: filterValues
    };

    //this.reportsService.setPaginador(this.tablaCargar);

    // this.getComptrollerShareholderList();
  }


  exportExcel() {
    this.isButtonDisabled = true;
    if (this.tablaCargar.rows != 0) {
      this.tablaCargar.rows = 0;
    }
    this.store.dispatch(exportExcelComptrollerReporting({ paginador: this.tablaCargar }));
  }

  exportCsv() {
    this.isButtonDisabled = true;
    if (this.tablaCargar.rows != 0) {
      this.tablaCargar.rows = 0;
    }
    this.store.dispatch(exportCsvComptrollerReporting({ paginador: this.tablaCargar }));
  }

  exportPdf() {
    this.isButtonDisabled = true;
    if (this.tablaCargar.rows != 0) {
      this.tablaCargar.rows = 0;
    }
    this.store.dispatch(exportPdfComptrollerReporting({ paginador: this.tablaCargar }));
  }


}
