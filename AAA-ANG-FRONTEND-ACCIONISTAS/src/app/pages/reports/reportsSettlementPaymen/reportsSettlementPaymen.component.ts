import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportsSettlementPaymen',
  templateUrl: './reportsSettlementPaymen.component.html',
  styleUrls: ['./reportsSettlementPaymen.component.css']
})
export class reportsSettlementPaymenComponent implements OnInit {

  constructor(private router: Router
    ) { }

  ngOnInit() {
  }


  goBack() {
    this.router.navigate(['../reportes'])
  }

  
  goSettlementPayment() {
    this.router.navigate(['../liquidacionPagos'])
  }

  goPaymentQuery() {
    this.router.navigate(['../consultaPagos'])
  }



}