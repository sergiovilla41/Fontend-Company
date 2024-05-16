import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportsAssembly',
  templateUrl: './reportsAssembly.component.html',
  styleUrls: ['./reportsAssembly.component.css']
})
export class ReportsAssemblyComponent implements OnInit {

  constructor(private router: Router
    ) { }

  ngOnInit() {
  }


  goBack() {
    this.router.navigate(['../reportes'])
  }


  goComptrollerReporting() {
    this.router.navigate(['../composicionAccionaria'])
  }

  goReportBallot() {
    this.router.navigate(['../reporteVotaciones'])
  }

  goPrintingCards() {
    this.router.navigate(['../impresionTarjetones'])
  }

}
