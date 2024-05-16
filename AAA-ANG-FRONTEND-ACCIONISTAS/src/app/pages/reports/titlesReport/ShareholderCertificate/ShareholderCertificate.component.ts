import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/model/state.model';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getShareholderListDropdown } from 'src/app/store/selectors/shareholder/shareholder.selector';
import { Router } from '@angular/router';
import { shareholderList } from 'src/app/store/actions/shareholder.action';
import { exportPdfShareholderCertificate } from 'src/app/store/actions/reports.action';

@Component({
  selector: 'app-ShareholderCertificate',
  templateUrl: './ShareholderCertificate.component.html',
  styleUrls: ['./ShareholderCertificate.component.css']
})
export class ShareholderCertificateComponent implements OnInit {

  isButtonDisabled: boolean = false;
  loadings: boolean = false;

  accionistas$ = this.store.select(getShareholderListDropdown)
  fechaCapital: Date;
  fechaIntrinseco: Date;

  form = this.fb.group({
    nombreAccionista: ['', Validators.required],
    atn: ['', Validators.required],
    fechaCapital: ['', Validators.required],
    fechaIntrinseco: ['', Validators.required],
    valorIntrinseco: ['', Validators.required]
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

    this.form.get('valorIntrinseco').setValue(null);

  }

  goBack() {
    this.router.navigate(['../reportesTitulos'])
  }


  generateCertificate() {
    if (this.form.valid) {

      const diaCapital = this.form.get('fechaCapital').value ? new Date(this.form.get('fechaCapital').value).getDate() : null;
      const mesCapital = this.form.get('fechaCapital').value ? (new Date(this.form.get('fechaCapital').value).getMonth() + 1).toString().padStart(2, '0') : null;
      const añoCapital = this.form.get('fechaCapital').value ? new Date(this.form.get('fechaCapital').value).getFullYear() : null;
      const fechaCapitalFormateada = this.form.get('fechaCapital').value ? `${añoCapital}-${mesCapital}-${diaCapital.toString().padStart(2, '0')}` : null;

      const diaIntrinseco = this.form.get('fechaIntrinseco').value ? new Date(this.form.get('fechaIntrinseco').value).getDate() : null;
      const mesIntrinseco = this.form.get('fechaIntrinseco').value ? (new Date(this.form.get('fechaIntrinseco').value).getMonth() + 1).toString().padStart(2, '0') : null;
      const añoIntrinseco = this.form.get('fechaIntrinseco').value ? new Date(this.form.get('fechaIntrinseco').value).getFullYear() : null;
      const fechaIntrinsecoFormateada = this.form.get('fechaIntrinseco').value ? `${añoIntrinseco}-${mesIntrinseco}-${diaIntrinseco.toString().padStart(2, '0')}` : null;



      let id_registro = this.form.get('nombreAccionista').value;
      let atn = this.form.get('atn').value;
      let fecha_capital = fechaCapitalFormateada.toString();
      let fecha_intrinseco = fechaIntrinsecoFormateada.toString();
      let valor_intrinseco = parseFloat(this.form.get('valorIntrinseco').value);

      this.store.dispatch(exportPdfShareholderCertificate({ id_registro: id_registro, atn: atn, fecha_capital: fecha_capital, fecha_intrinseco: fecha_intrinseco, valor_intrinseco: valor_intrinseco }));

    } else {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }
  }




}
