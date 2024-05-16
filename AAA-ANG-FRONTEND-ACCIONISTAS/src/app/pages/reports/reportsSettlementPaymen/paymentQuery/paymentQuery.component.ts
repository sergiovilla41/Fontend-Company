import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Filtro, TablaCargar, TipoOrder } from 'src/app/interfaces/shareholders.interface';
import { ReportsService } from 'src/app/services/reports/reports.service';
import { Subscription } from 'rxjs';
import { State } from "src/app/model/state.model";
import { Store } from "@ngrx/store";
import { exportCsvComptrollerReporting, exportCsvPaymentQuery, exportExcelComptrollerReporting, exportExcelPaymentQuery, exportPdfComptrollerReporting, exportPdfPaymentQuery } from 'src/app/store/actions/reports.action';
import { paymentReport } from 'src/app/model/paymentReport.model';

@Component({
  selector: 'app-paymentQuery',
  templateUrl: './paymentQuery.component.html',
  styleUrls: ['./paymentQuery.component.css']
})
export class PaymentQueryComponent implements OnInit {

  loadings: boolean = true;
  isLoading = false;
 paymentListState: paymentReport[];
  totRegistros: number = 0;
  loadingsTable: boolean = true;
  suscription: Subscription;
  tablaCargar: TablaCargar = {
    first: 0,
    rows: 50,
    orderCampo: undefined,
    tipoOrder: TipoOrder.ASC
  };

  isButtonDisabled: boolean = false;


  constructor(private router: Router,
    private reportsService: ReportsService,
    private store: Store<State>
  ) {

    const currentYear = new Date().getFullYear();
    const startYear = 1992;


  }

  ngOnInit() {
    this.reportsService.getPaymentList(this.tablaCargar).subscribe(payment => {
      if (payment) {
        this.loadings = true
        this.paymentListState = payment.rows;
        this.totRegistros = payment.count;
        this.loadingsTable = false;
      }
    }, error => {
      this.loadingsTable = false;
    })


    this.getPaymentList();

    this.store.subscribe(async ({ reportState }) => {
      this.isLoading = reportState.isLoading;
      this.isButtonDisabled = reportState.isLoading == false ? false : true;
    });

  }


  goBack() {
    this.router.navigate(['../reportesLiquidacionPagos'])
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

    this.reportsService.setPaginador(this.tablaCargar)

    this.getPaymentList();
  }


  getPaymentList(): void {
    this.reportsService.fetchPaymentList();
  }


  
  exportExcel() {
    this.isButtonDisabled = true;
    if (this.tablaCargar.rows != 0 ){
      this.tablaCargar.rows = 0;
    }
    // con paginador    
    //this.store.dispatch(exportExcelPaymentQuery({ paginador: this.tablaCargar }));

    // sin paginador
    this.store.dispatch(exportExcelPaymentQuery());

  }

  exportCsv() {
    this.isButtonDisabled = true;
    if (this.tablaCargar.rows != 0 ){
      this.tablaCargar.rows = 0;
    }    
    // con paginador    
    //this.store.dispatch(exportCsvPaymentQuery({ paginador: this.tablaCargar }));

    // sin paginador
    this.store.dispatch(exportCsvPaymentQuery());
  }

  exportPdf() {
    this.isButtonDisabled = true;
    if (this.tablaCargar.rows != 0 ){
      this.tablaCargar.rows = 0;
    }
        // con paginador    
    //this.store.dispatch(exportPdfPaymentQuery({ paginador: this.tablaCargar }));

    // sin paginador
    this.store.dispatch(exportPdfPaymentQuery());
  }


}
