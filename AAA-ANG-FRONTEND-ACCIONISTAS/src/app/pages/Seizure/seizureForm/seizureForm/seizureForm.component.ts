import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { State } from 'src/app/model/state.model';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { SeizureSharedDataService } from 'src/app/services/seizure/seizureSharedData.service';
import { SeizureService } from 'src/app/services/seizure/seizure.service';
import { Titles } from 'src/app/model/titles.model';
import { UpdateStateTitle, titleList } from 'src/app/store/actions/title.action';
import { TypesInterface } from 'src/app/model/types.model';
import { TypeSource } from 'src/app/store/actions/TypeSource.action';
import { Seizure } from 'src/app/model/seizure.model';
import { UpdateStateSeizure, newSeizure, updateSeizure } from 'src/app/store/actions/seizure.action';
import { seizureState } from 'src/app/store/reducers/seizure/seizure.reducer';
import { take } from 'rxjs';

@Component({
  selector: 'app-seizureForm',
  templateUrl: './seizureForm.component.html',
  styleUrls: ['./seizureForm.component.css']
})
export class SeizureFormComponent implements OnInit {

  task: string;
  loadings: boolean = false;
  status: seizureState;
  form: FormGroup;

  permissionstitlesType$ = this.store.select(state => state.titleState);
  titles: Titles[] = [];
  selectedTitles;

  permissionstypeSource$ = this.store.select(state => state.typeSourceList);
  typeSource: TypesInterface[] = [];
  selectedTypeSource;

  prepareDataSeizure: Seizure = {};
  fechaInicio: Date;
  fechaVencimiento: Date;
  maxDate: Date = new Date();
  idSeizure: string = null;

  constructor(private _snackBar: MatSnackBar,
    private store: Store<State>,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private seizureService: SeizureService,
    private seizureSharedDataService: SeizureSharedDataService) {

    this.form = this.fb.group({
      selectedTitles: ['', Validators.required],
      selectedTypeSource: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaVencimiento: [''],
      tipo_auto: [''],
      identificacionDemandante: [''],
      nombre_demandante: [''],
      valor_embargo: [''],
      valor_dividendo: [''],
      otro_valor: [''],
      juzgado: [''],
      bien_embargado: [''],
      identificacion_beneficiario: [''],
      observacion: ['', Validators.required],
    });


  }

  ngOnInit() {
    this.store.dispatch(UpdateStateTitle());
    this.store.dispatch(titleList());
    this.store.dispatch(TypeSource());

    this.store.subscribe(async ({ seizureList }) => {
      this.status = seizureList;

      if (this.status.error || this.status.status === 403) {
        let message = seizureList.error ? seizureList.error : seizureList.msg
        this.snackBar(message, seizureList.status);
      }

      if (this.status.status === 200) {
        let snack = await this.snackBar(seizureList.msg, seizureList.status);

        if (snack) {
          this.store.dispatch(UpdateStateSeizure());
          this.goBack();
        }
      }
    });

    this.store.subscribe(({ titleState }) => {

      if (titleState.titleList) {
        this.titles = titleState.titleList;

        this.store.subscribe(({ typeSourceList }) => {
          if (typeSourceList.typeSourceList) {
            this.typeSource = typeSourceList.typeSourceList;
          }
        });
    
    
        this.seizureSharedDataService.getData().subscribe(valor => {
    
          if (valor.task === 'edit') {
            this.task = "Edición"
    
            this.seizureSharedDataService.getIdSeizure().subscribe(async idSeizure => {
              if (idSeizure) {
                this.getSeizure(idSeizure)
              }
            });
    
          } else {
            this.task = "Creación"
            this.form.get('identificacionDemandante').setValue(null);
            this.form.get('valor_embargo').setValue(null);
            this.form.get('valor_dividendo').setValue(null);
            this.form.get('otro_valor').setValue(null);
            this.form.get('identificacion_beneficiario').setValue(null);
          }
    
        });

        this.loadings = true;

      }
    });

   


  }

  goBack() {
    this.seizureSharedDataService.setData(false, null);
    this.seizureService.fetchSeizureList();
  }

  addSeizure() {

    if (this.form.valid) {
      if (this.task === "Edición"){

        this.confirmationService.confirm({
          header: 'Edición de embargo',
          message: '¿Está seguro que desea editar el embargo del título ' + this.selectedTitles.TIPO_ACCIONISTA + ' ' + this.selectedTitles.CONSECUTIVO + ' ?',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: "Aceptar",
          acceptButtonStyleClass: 'p-button-rounded p-button-sm',
          rejectButtonStyleClass: 'p-button-rounded p-button-outlined p-button-sm',
          accept: () => {
            this.submitFormulario();
          }
        });
        } else{
          this.confirmationService.confirm({
          header: 'Embargo de título',
          message: '¿Está seguro que desea guardar el embargo del título ' + this.selectedTitles.TIPO_ACCIONISTA + ' ' + this.selectedTitles.CONSECUTIVO + ' ?',
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

  getSeizure(idSeizure: string): void {

    this.seizureService.getSeizure(idSeizure).pipe(take(1)).subscribe(async seizure => {

      if (seizure) {

        this.idSeizure = seizure.ID_REGISTRO;
        this.selectedTitles = this.titles.find( r => r.TITULO_UUID == seizure.titulo.ID_REGISTRO);
        this.selectedTypeSource = seizure.tipo_procedencia ? this.typeSource.find( r => r.ID_REGISTRO == seizure.tipo_procedencia.ID_REGISTRO) : null;
        this.fechaInicio = seizure.FECHA_INICIO ? new Date(seizure.FECHA_INICIO) : null;
        this.fechaVencimiento = seizure.FECHA_VENCIMIENTO ? new Date(seizure.FECHA_VENCIMIENTO) : null;
        this.form.get('tipo_auto').setValue(seizure.TIPO_AUTO);
        this.form.get('identificacionDemandante').setValue(seizure.IDENTIFICACION_DEMANDANTE);
        this.form.get('nombre_demandante').setValue(seizure.NOMBRE_DEMANDANTE);
        this.form.get('valor_embargo').setValue(seizure.VALOR_EMBARGO);
        this.form.get('valor_dividendo').setValue(seizure.VALOR_DIVIDENDO);
        this.form.get('otro_valor').setValue(seizure.OTRO_VALOR);
        this.form.get('juzgado').setValue(seizure.JUZGADO);
        this.form.get('bien_embargado').setValue(seizure.BIEN_EMBARGADO);
        this.form.get('identificacion_beneficiario').setValue(seizure.IDENTIFICACION_BENEFICIARIO);
        this.form.get('observacion').setValue(seizure.OBSERVACION);
      }

    })
  }

  public async submitFormulario() {

    const diaInicio = this.form.get('fechaInicio').value ? this.form.get('fechaInicio').value.getDate() : null;
    const mesInicio = this.form.get('fechaInicio').value ? this.form.get('fechaInicio').value.getMonth() + 1 : null;
    const añoInicio = this.form.get('fechaInicio').value ? this.form.get('fechaInicio').value.getFullYear() : null;
    const fechaInicioFormateada = this.form.get('fechaInicio').value ? `${diaInicio}-${mesInicio}-${añoInicio}` : null;

    const diaVencimiento = this.form.get('fechaVencimiento').value ? this.form.get('fechaVencimiento').value.getDate() : null;
    const mesVencimiento = this.form.get('fechaVencimiento').value ? this.form.get('fechaVencimiento').value.getMonth() + 1 : null;
    const añoVencimiento = this.form.get('fechaVencimiento').value ? this.form.get('fechaVencimiento').value.getFullYear() : null;
    const fechaVencimientoFormateada = this.form.get('fechaVencimiento').value ? `${diaVencimiento}-${mesVencimiento}-${añoVencimiento}` : null;

    let userPetition = JSON.parse(localStorage.getItem("dataLogin"))

    this.prepareDataSeizure = {
      TITULO_UUID: this.selectedTitles.TITULO_UUID,
      TIPO_PROCEDENCIA_UUID: this.selectedTypeSource ? this.selectedTypeSource.ID_REGISTRO : '',
      FECHA_INICIO: fechaInicioFormateada,
      FECHA_VENCIMIENTO: fechaVencimientoFormateada,
      TIPO_AUTO: this.form.get('tipo_auto').value ? this.form.get('tipo_auto').value.toLowerCase() : '',
      IDENTIFICACION_DEMANDANTE: this.form.get('identificacionDemandante').value ? this.form.get('identificacionDemandante').value : '',
      NOMBRE_DEMANDANTE: this.form.get('nombre_demandante').value ? this.form.get('nombre_demandante').value.toLowerCase() : '',
      VALOR_EMBARGO: this.form.get('valor_embargo').value ? this.form.get('valor_embargo').value : 0,
      VALOR_DIVIDENDO: this.form.get('valor_dividendo').value ? this.form.get('valor_dividendo').value : 0,
      OTRO_VALOR: this.form.get('otro_valor').value ? this.form.get('otro_valor').value : 0,
      JUZGADO: this.form.get('juzgado').value ? this.form.get('juzgado').value.toLowerCase() : '',
      BIEN_EMBARGADO: this.form.get('bien_embargado').value ? this.form.get('bien_embargado').value.toLowerCase() : '',
      IDENTIFICACION_BENEFICIARIO: this.form.get('identificacion_beneficiario').value ? this.form.get('identificacion_beneficiario').value : '',
      OBSERVACION: this.form.get('observacion').value ? this.form.get('observacion').value.toLowerCase() : '',
      EMAILADMIN: userPetition.email,
      ROLADMIN: userPetition.rol.rol
    };

    if (this.task == 'Edición') {
      this.prepareDataSeizure.ID_REGISTRO = this.idSeizure;
      this.store.dispatch(updateSeizure({ seizure: this.prepareDataSeizure }));
    } else {
      
      this.store.dispatch(newSeizure({ seizure: this.prepareDataSeizure }));
    }

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
      this._snackBar.open(message, 'Cerrar', {
        duration: 4000,
        verticalPosition: 'top',
        panelClass: panelclass
      });

      return true;
    }

  }

}
