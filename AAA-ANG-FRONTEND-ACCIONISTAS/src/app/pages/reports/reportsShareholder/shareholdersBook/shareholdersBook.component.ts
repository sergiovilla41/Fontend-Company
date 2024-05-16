import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablaCargar, TipoOrder } from 'src/app/interfaces/shareholders.interface';
import { State } from "src/app/model/state.model";
import { Store } from "@ngrx/store";
import { exportPdfShareholderBook } from 'src/app/store/actions/reports.action';

@Component({
  selector: 'app-shareholdersBook',
  templateUrl: './shareholdersBook.component.html',
  styleUrls: ['./shareholdersBook.component.css']
})


export class ShareholdersBookComponent implements OnInit {

  tablaCargar: TablaCargar = {
    first: 0,
    rows: 50,
    orderCampo: undefined,
    tipoOrder: TipoOrder.ASC
  };
  isButtonDisabled: boolean = false;
  loadings: boolean = false;


  constructor(private router: Router,
    private store: Store<State>) { }

  ngOnInit() {

    this.store.subscribe(async ({ reportState }) => {
      this.loadings = reportState.isLoading;
      this.isButtonDisabled = reportState.isLoading == false ? false : true;
    });


  }

  goBack() {
    this.router.navigate(['../reportesAccionistas'])
  }

  generatePdf() {
/*     if (this.tablaCargar.rows != 0 ){
      this.tablaCargar.rows = 0;
    } */

    //this.store.dispatch(exportPdfShareholderBook({ paginador: this.tablaCargar }));
    this.store.dispatch(exportPdfShareholderBook());
  }

}
