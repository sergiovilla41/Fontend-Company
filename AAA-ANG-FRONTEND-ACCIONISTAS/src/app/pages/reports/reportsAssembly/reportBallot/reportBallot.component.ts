import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State } from 'src/app/model/state.model';
import { Store } from '@ngrx/store';
import { assemblyList } from 'src/app/store/actions/assembly.action';
import { getAssemblyListDropdown } from 'src/app/store/selectors/assembly/assembly.selector';
import { FormBuilder, Validators } from '@angular/forms';
import { exportPdfBallotReport } from 'src/app/store/actions/reports.action';


@Component({
  selector: 'app-reportBallot',
  templateUrl: './reportBallot.component.html',
  styleUrls: ['./reportBallot.component.css']
})
export class ReportBallotComponent implements OnInit {

  isButtonDisabled: boolean = false;
  loadings: boolean = false;
  asambleas$ = this.store.select(getAssemblyListDropdown)

  form = this.fb.group({
    id: [null, Validators.required]
  })

  constructor(private router: Router,
    private store: Store<State>,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.store.dispatch(assemblyList());

    this.store.subscribe(async ({ reportState }) => {
      this.loadings = reportState.isLoading;
      this.isButtonDisabled = reportState.isLoading == false ? false : true;
    });

  }


  goBack() {
    this.router.navigate(['../reportesAsamblea'])
  }

  generatePdf() {
    if (this.form.valid) {
      let id_registro = this.form.get('id').value
      this.store.dispatch(exportPdfBallotReport({ id_registro: id_registro }));

    } else {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }
  }

}
