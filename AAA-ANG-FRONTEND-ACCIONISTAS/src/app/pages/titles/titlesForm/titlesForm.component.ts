import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { State } from 'src/app/model/state.model';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { Titles } from 'src/app/model/titles.model';
import { TitleSharedDataService } from 'src/app/services/titles/titleSharedData.service';
import { titleState } from 'src/app/store/reducers/title/title.reducer';
import { TitlesComponent } from '../../titles/titles.component';
import { Shareholders } from 'src/app/model/shareholders.model';
import { editTitle, newTitle, UpdateStateTitle } from 'src/app/store/actions/title.action';
import { shareholderList } from 'src/app/store/actions/shareholder.action';

@Component({
  selector: 'app-titlesForm',
  templateUrl: './titlesForm.component.html',
  styleUrls: ['./titlesForm.component.css']
})
export class TitlesFormComponent implements OnInit {

  idParam: number;
  stateParam: string;
  task: string;
  loadings: boolean = false;
  maxDate: Date = new Date();
  prepareDataTitle: Titles = {};
  status: titleState;
  form: FormGroup;
  fechaEntregaTitulo: Date;

  permissionsShareholders$ = this.store.select(state => state.shareholderList);
  accionistas: Shareholders[] = [];
  selectedShareholders: Shareholders;
  editingTitle: Titles;
  

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private store: Store<State>,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private titleSharedData: TitleSharedDataService,
    private titlesComponent: TitlesComponent) {

    this.form = this.fb.group({
      selectedShareholders: ['', Validators.required],
      consecutivo: ['', Validators.required],
      fechaEntregaTitulo: ['', Validators.required],
      observacion: ['', Validators.required]

    });

    this.store.dispatch(UpdateStateTitle());

    this.store.subscribe(({ shareholderList }) => {
      if (shareholderList.shareholderList) {
        this.accionistas = shareholderList.shareholderList;
        this.loadings = true;
        if (this.task == "Edición") {
          this.fechaEntregaTitulo = new Date(this.editingTitle.FECHA_ENTREGA);
          this.form.setValue({
            selectedShareholders: this.editingTitle.ACCIONISTA_UUID,
            consecutivo: this.editingTitle.CONSECUTIVO,
            fechaEntregaTitulo: this.editingTitle.FECHA_ENTREGA,
            observacion: this.editingTitle.OBSERVACION
          })
          this.selectedShareholders = shareholderList.shareholderList.find(el => el.ID_REGISTRO === this.editingTitle.ACCIONISTA_UUID)
        }
      }
    });


    this.store.subscribe(async ({ titleState }) => {
      this.status = titleState;

      if (this.status.error || this.status.status === 403) {

        let message = titleState.error ? titleState.error : titleState.msg
        this.snackBar(message, titleState.status);
        this.store.dispatch(UpdateStateTitle());

      }

      if (this.status.status === 200) {

        let snack = await this.snackBar(titleState.msg, titleState.status);
        this.store.dispatch(UpdateStateTitle());

        if (await snack) {
          this.goBack();
        }
      }
    });

  }

  ngOnInit() {
    
    this.store.dispatch(UpdateStateTitle());
    this.titleSharedData.getEditingTitle().subscribe(titulo => {
      this.editingTitle = titulo;
    })

    this.permissionsShareholders$.subscribe(permissionsShareholders => {
      if (!permissionsShareholders.shareholderList) {
        this.store.dispatch(shareholderList());
      }
    });

    this.titleSharedData.getData().subscribe(valor => {

      if (valor?.task === 'edit') {
        this.task = "Edición"

        this.titleSharedData.getIdTitle().subscribe(idTitle => {
          if (idTitle) {
            // this.getShareholder(idShareholder)
          }

        });
      } else {
        this.task = "Nuevo"
      }

    });

  }


  confirm(event: Event) {

    if (this.form.valid) {

      if (this.task === "Edición"){

        this.confirmationService.confirm({
          header: 'Edición de titulo.',
          message: '¿Está seguro de editar este el titulo con el consecutivo ' + this.form.get('consecutivo').value.toLowerCase() + ' ?',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: "Aceptar",
          acceptButtonStyleClass: 'p-button-rounded p-button-sm',
          rejectButtonStyleClass: 'p-button-rounded p-button-outlined p-button-sm',
          accept: () => {
            this.submitFormulario();
          }
        });
      } else {
        this.confirmationService.confirm({
          header: 'Creación de titulo.',
          message: '¿Está seguro de crear este el titulo con el consecutivo ' + this.form.get('consecutivo').value.toLowerCase() + ' ?',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: "Aceptar",
          acceptButtonStyleClass: 'p-button-rounded p-button-sm',
          rejectButtonStyleClass: 'p-button-rounded p-button-outlined p-button-sm',
          accept: () => {
            this.submitFormulario();
          }
  
        });
      }
    } else {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      })
    }
  }

  public async submitFormulario() {

    const dia = this.form.get('fechaEntregaTitulo').value ? this.form.get('fechaEntregaTitulo').value.getDate() : null;
    const mes = this.form.get('fechaEntregaTitulo').value ? this.form.get('fechaEntregaTitulo').value.getMonth() + 1 : null;
    const año = this.form.get('fechaEntregaTitulo').value ? this.form.get('fechaEntregaTitulo').value.getFullYear() : null;

    const fechaFormateada = this.form.get('fechaEntregaTitulo').value ? `${dia}-${mes}-${año}` : null;

    let userPetition = JSON.parse(localStorage.getItem("dataLogin"))
    this.prepareDataTitle = {
      ROLADMIN: userPetition.rol.rol,
      EMAILADMIN: userPetition.email,
      ACCIONISTA_UUID: this.selectedShareholders.ID_REGISTRO,
      CONSECUTIVO: this.form.get('consecutivo').value ? this.form.get('consecutivo').value.toLowerCase() : '',
      FECHA_ENTREGA: fechaFormateada,
      OBSERVACION: this.form.get('observacion').value ? this.form.get('observacion').value : ''
    };

    if (this.task == 'Edición') {
      this.store.dispatch(editTitle({
        editTitles: {
          ACCIONISTA_UUID: this.selectedShareholders.ID_REGISTRO,
          CONSECUTIVO: this.form.get('consecutivo').value,
          FECHA_ENTREGA: this.fechaEntregaTitulo.toLocaleDateString('es-CO'),
          ID_REGISTRO: this.editingTitle.TITULO_UUID,
          OBSERVACION: this.form.get('observacion').value,
          USUARIOEDITA: JSON.parse(localStorage.getItem("dataLogin")).email,
          ROLADMIN: JSON.parse(localStorage.getItem("dataLogin")).rol.rol,
        }
      }))
    } else {
      this.store.dispatch(newTitle({ title: this.prepareDataTitle }));
    }


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


}
