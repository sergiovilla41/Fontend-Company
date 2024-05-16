import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComptrollerReporting } from 'src/app/model/comptrollerReporting.model';
import { LazyLoadEvent } from 'primeng/api';
import { Filtro, TablaCargar, TipoOrder } from 'src/app/interfaces/shareholders.interface';
import { ReportsService } from 'src/app/services/reports/reports.service';
import { Subscription } from 'rxjs';
import { State } from "src/app/model/state.model";
import { Store } from "@ngrx/store";
import { exportExcelComptrollerReporting, exportExcelShareholderLedgerRegister } from 'src/app/store/actions/reports.action';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-shareholderLedgerRegister',
  templateUrl: './shareholderLedgerRegister.component.html',
  styleUrls: ['./shareholderLedgerRegister.component.css']
})
export class ShareholderLedgerRegisterComponent implements OnInit {

  loadings: boolean = true;
  isLoading = false;
  comptrollerReportingListState: ComptrollerReporting[];
  totRegistros: number = 0;
  loadingsTable: boolean = true;
  suscription: Subscription;

  yearOptions: number[] = [];
  selectedYear: number = 0;
  isButtonDisabled: boolean = false;

  form = this.fb.group({
    anio: [null, Validators.required]
  })

  constructor(private router: Router,
    private reportsService: ReportsService,
    private store: Store<State>,
    private fb: FormBuilder) {

    const currentYear = new Date().getFullYear();
    const startYear = 1992;

    for (let year = currentYear; year >= startYear; year--) {
      this.yearOptions.push(year);
    }


  }

  ngOnInit() {

    this.store.subscribe(async ({ reportState }) => {
      this.loadings = reportState.isLoading;
      this.isButtonDisabled = reportState.isLoading == false ? false : true;
    });

  }


  goBack() {
    this.router.navigate(['../reportesTitulos'])
  }


  getComptrollerShareholderList(): void {
    this.reportsService.fetchComptrollerShareholderList();
  }

  exportExcel() {

    if (this.form.valid) {
      let anio = this.form.get('anio').value
      this.store.dispatch(exportExcelShareholderLedgerRegister({ anio: anio }));

    } else {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }
  }


}
