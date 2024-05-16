import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State } from "src/app/model/state.model";
import { Store } from "@ngrx/store";
import { exportPdfReportDian, exportPdfSuperSocietiesReport } from 'src/app/store/actions/reports.action';

@Component({
  selector: 'app-reportDian',
  templateUrl: './reportDian.component.html',
  styleUrls: ['./reportDian.component.css']
})
export class ReportDianComponent implements OnInit {

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
      this.store.dispatch(exportPdfReportDian());
    }

}
