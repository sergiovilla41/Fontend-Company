import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State } from "src/app/model/state.model";
import { Store } from "@ngrx/store";
import { FormBuilder, Validators } from '@angular/forms';
import { shareholderWarrantyList } from 'src/app/store/actions/shareholder.action';
import { getShareholderWarrantyListDropdown } from 'src/app/store/selectors/shareholder/shareholder.selector';
import { exportPdfWarrantyShareholder } from 'src/app/store/actions/reports.action';

@Component({
  selector: 'app-warrantyShareholder',
  templateUrl: './warrantyShareholder.component.html',
  styleUrls: ['./warrantyShareholder.component.css']
})
export class WarrantyShareholderComponent implements OnInit {

  isButtonDisabled: boolean = false;
  loadings: boolean = false;
  accionistas$ = this.store.select(getShareholderWarrantyListDropdown)

  form = this.fb.group({
    nombreAccionista: [null, Validators.required]
  })

  constructor(private router: Router,
    private store: Store<State>,
    private fb: FormBuilder) { }


    ngOnInit() {

      this.store.dispatch(shareholderWarrantyList());
  
      this.store.subscribe(async ({ reportState }) => {
        this.loadings = reportState.isLoading;
        this.isButtonDisabled = reportState.isLoading == false ? false : true;
      });
  
    }
  
  
    goBack() {
      this.router.navigate(['../reportesTitulos'])
    }
  
    generatePdf() {
      if (this.form.valid) {
        let id_registro = this.form.get('nombreAccionista').value
        this.store.dispatch(exportPdfWarrantyShareholder({ id_registro: id_registro }));  
      } else {
        Object.values(this.form.controls).forEach(control => {
          control.markAsTouched();
        })
      }
    }

}
