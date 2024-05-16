import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CancelTitles } from 'src/app/model/cancelTitles.model';
import { State } from 'src/app/model/state.model';
import { Store } from '@ngrx/store';
import { TitleSharedDataService } from 'src/app/services/titles/titleSharedData.service';
import { TitlesComponent } from '../titles.component';
import { cancelTitle, cleanState, UpdateStateTitle } from 'src/app/store/actions/title.action';
import { titleState } from 'src/app/store/reducers/title/title.reducer';
import { Titles } from 'src/app/model/titles.model';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { setCancelTitles } from 'src/app/store/actions/traslado.action';
import { TrasladosActions } from '../../traslados/traslados.component';
import { TitlesService } from 'src/app/services/titles/titles.service';

@Component({
  selector: 'app-cancelTitle',
  templateUrl: './cancelTitle.component.html',
  styleUrls: ['./cancelTitle.component.css']
})
export class CancelTitleComponent implements OnInit {

  selectedRows: Titles[] = [];
  form: FormGroup;
  status: titleState;
  toTraslate: boolean = false;


  constructor(
    private titleSharedData: TitleSharedDataService,
    private titlesComponent: TitlesComponent,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private store: Store<State>,
    private router: Router,
    private ref: DynamicDialogRef,
    private titlesService: TitlesService
  ) {

    this.store.dispatch(UpdateStateTitle());

    this.store.subscribe(async ({ titleState }) => {
      this.status = titleState;

      if (this.status.status === 200) {
        let snack = this.snackBar(titleState.msg, titleState.status);
        this.store.dispatch(cleanState())
        if (snack) {
          this.onCancelClick();
          this.goBack();
        }
      }
    });

  }

  ngOnInit() {
    this.titleSharedData.getCancelTitle().subscribe(valor => {

      const data = valor.map(data => {
        return {
          TITULO_UUID: data.TITULO_UUID,
          CONSECUTIVO: data.CONSECUTIVO,
          NOMBRE_ACCIONISTA: data.NOMBRE_ACCIONISTA,
          ACCIONES: data.ACCIONES,
          OBSERVACION: null
        };
      });

      
      this.selectedRows = data;

    });

    this.store.subscribe(({ titleState }) => {
      if (titleState.status === 200) {
        if (this.toTraslate) {
          this.router.navigate(['./traslados'])
          this.toTraslate = false;
        }
        this.ref.close()
        this.titlesService.loadTitlesList()
      }
    })
  }

  onCancelClick() {
    this.titlesComponent.onCancelClick()
  }


  validateData(persona) {
    if (persona.OBSERVACION == null || persona.OBSERVACION == '') {
      return false;
    } else {
      return true;
    }
  }

  cancelTitle() {
    if (this.selectedRows.every(this.validateData)) {
      let cancelTitleData: CancelTitles = {};
      let userPetition = JSON.parse(localStorage.getItem("dataLogin"))

      const data = this.selectedRows.map(data => {
        return {
          TITULO_UUID: data.TITULO_UUID,
          OBSERVACION: data.OBSERVACION
        };
      });

      cancelTitleData.DATA = data;
      cancelTitleData.EMAILADMIN = userPetition.email;
      cancelTitleData.ROLADMIN = userPetition.rol.rol;
      this.store.dispatch(cancelTitle({ cancelTitles: cancelTitleData }));

    } else {
      this.snackBarAlert("Debe ingresar la observacion.")
    }
  }

  public async snackBarAlert(message) {
    await this._snackBar.open(message, 'Cerrar', {
      duration: 4000,
      verticalPosition: 'top',
      panelClass: ["background-red"],
    });
    return true;
  }

  goBack() {
    this.titleSharedData.setData(false, null);
    localStorage.removeItem("dataTitleEdit");
    this.titlesComponent.getTitlesList();
  }


  public async snackBar(message, status) {
    let panelclass;

    if (status == 200) {
      panelclass = ["background-blue"]
    }

    if (status == 403) {
      panelclass = ["background-red"]
    }

    if (status) {
      await this._snackBar.open(message, 'Cerrar', {
        duration: 4000,
        verticalPosition: 'top',
        panelClass: panelclass
      });

      return true;
    }

  }

  cancelAndTranslateTitle() {
    if (this.selectedRows.every(this.validateData)) {
      let cancelTitleData: CancelTitles = {};
      let userPetition = JSON.parse(localStorage.getItem("dataLogin"))

      const data = this.selectedRows.map(data => {
        return {
          TITULO_UUID: data.TITULO_UUID,
          OBSERVACION: data.OBSERVACION
        };
      });
      this.toTraslate = true;
      cancelTitleData.DATA = data;
      cancelTitleData.EMAILADMIN = userPetition.email;
      cancelTitleData.ROLADMIN = userPetition.rol.rol;
      this.store.dispatch(cancelTitle({ cancelTitles: cancelTitleData }));
      this.store.dispatch(setCancelTitles({ titles: this.selectedRows }))
    } else {
      this.snackBarAlert("Debe ingresar la observacion.")
    }
  }
}
