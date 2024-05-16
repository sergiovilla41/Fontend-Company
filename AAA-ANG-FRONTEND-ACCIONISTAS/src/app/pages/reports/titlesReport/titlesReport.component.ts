import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titlesReport',
  templateUrl: './titlesReport.component.html',
  styleUrls: ['./titlesReport.component.css']
})
export class TitlesReportComponent implements OnInit {

  constructor(private router: Router
    ) { }

  ngOnInit() {
  }


  goBack() {
    this.router.navigate(['../reportes'])
  }

  
  goShareholderLedgerRegister() {
    this.router.navigate(['../registroLibroAccionistas'])
  }

  goTitleShareholder() {
    this.router.navigate(['../imprimirTitulo'])
  }

  goSeizureShareholder() {
    this.router.navigate(['../embargosAccionistas'])
  }

  goWarrantyuShareholder() {
    this.router.navigate(['../garantiaAccionistas'])
  }

  goSharehodlerCertificate() {
    this.router.navigate(['../certificadoAccionistas'])
  }

}
