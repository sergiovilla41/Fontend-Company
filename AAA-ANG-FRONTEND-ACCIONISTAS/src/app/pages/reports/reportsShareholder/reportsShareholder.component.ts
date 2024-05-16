import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportsShareholder',
  templateUrl: './reportsShareholder.component.html',
  styleUrls: ['./reportsShareholder.component.css']
})
export class ReportsShareholderComponent implements OnInit {

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

  goreportDian() {
    this.router.navigate(['../resumenAcciones'])
  }

  goShareholderBook() {
    this.router.navigate(['../libroAccionistas'])
  }

  goSuperSocieties() {
    this.router.navigate(['../superSociedades'])
  }


}
