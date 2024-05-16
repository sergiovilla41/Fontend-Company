import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State } from "src/app/model/state.model";
import { Store } from "@ngrx/store";
import { FormBuilder, Validators } from '@angular/forms';
import { shareholderList } from 'src/app/store/actions/shareholder.action';
import { getShareholderListDropdown } from 'src/app/store/selectors/shareholder/shareholder.selector';
import { exportPdfSettlementpayment, exportPdfTitleShareholder } from 'src/app/store/actions/reports.action';


@Component({
  selector: 'app-settlementPayment',
  templateUrl: './settlementPayment.component.html',
  styleUrls: ['./settlementPayment.component.css']
})
export class SettlementPaymentComponent implements OnInit {
  isButtonDisabled: boolean = false;
  loadings: boolean = false;
  accionistas$ = this.store.select(getShareholderListDropdown)

  form = this.fb.group({
    nombreAccionista: [null, Validators.required],
    anios: [null, Validators.required],
  })

  constructor(private router: Router,
    private store: Store<State>,
    private fb: FormBuilder) { }


  ngOnInit() {

    this.store.dispatch(shareholderList());

    this.store.subscribe(async ({ reportState }) => {
      this.loadings = reportState.isLoading;
      this.isButtonDisabled = reportState.isLoading == false ? false : true;
    });

  }


  goBack() {
    this.router.navigate(['../reportesLiquidacionPagos'])
  }

  generatePdf() {

    if (this.form.valid) {

      let acionista_uuid = this.form.get('nombreAccionista').value
      let anios = this.form.get('anios').value

      this.store.dispatch(exportPdfSettlementpayment({ acionista_uuid: acionista_uuid, anios: anios }));
    } else {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }
  }

}
