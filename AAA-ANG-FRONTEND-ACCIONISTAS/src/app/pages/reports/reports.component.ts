import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private router: Router
    ) { }

  ngOnInit() {
  }


  goReportsShareholder() {
    this.router.navigate(['../reportesAccionistas'])
  }


  goReportsAssembly() {
    this.router.navigate(['../reportesAsamblea'])
  }


  goReportsTitle() {
    this.router.navigate(['../reportesTitulos'])
  }


  goSettlementPayment() {
    this.router.navigate(['../reportesLiquidacionPagos'])
  }

}
