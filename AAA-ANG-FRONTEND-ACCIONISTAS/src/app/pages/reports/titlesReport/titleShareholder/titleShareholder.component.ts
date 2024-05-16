import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State } from "src/app/model/state.model";
import { Store } from "@ngrx/store";
import { FormBuilder, Validators } from '@angular/forms';
import { shareholderList } from 'src/app/store/actions/shareholder.action';
import { getShareholderListDropdown } from 'src/app/store/selectors/shareholder/shareholder.selector';
import { exportPdfTitleShareholder } from 'src/app/store/actions/reports.action';
import { getTitlesListDropdown } from 'src/app/store/selectors/titles/titles.selector';
import { titleShareholder } from 'src/app/store/actions/title.action';

@Component({
  selector: 'app-titleShareholder',
  templateUrl: './titleShareholder.component.html',
  styleUrls: ['./titleShareholder.component.css']
})
export class TitleShareholderComponent implements OnInit {

  isButtonDisabled: boolean = false;
  loadings: boolean = false;
  accionistas$ = this.store.select(getShareholderListDropdown)
  titulos$ = this.store.select(getTitlesListDropdown)

  form = this.fb.group({
    nombreAccionista: [null, Validators.required],
    titulo: [null, Validators.required],
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
    this.router.navigate(['../reportesTitulos'])
  }

  generatePdf() {
    if (this.form.valid) {

      let acionista_uuid = this.form.get('nombreAccionista').value
      let titulo_uuid = this.form.get('titulo').value

      this.store.dispatch(exportPdfTitleShareholder({ acionista_uuid: acionista_uuid, titulo_uuid: titulo_uuid }));
    } else {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }
  }


  onOptionShareholder() {
    let acionista_uuid = this.form.get('nombreAccionista').value

    if (acionista_uuid) {

      this.store.dispatch(titleShareholder({ titulo_uuid: acionista_uuid }));

    }


  }

}