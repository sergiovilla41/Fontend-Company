import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { State } from 'src/app/model/state.model';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { Titles } from 'src/app/model/titles.model';
import { UpdateStateTitle, titleList } from 'src/app/store/actions/title.action';
import { TypesInterface } from 'src/app/model/types.model';
import { TypeSource } from 'src/app/store/actions/TypeSource.action';
import { Seizure } from 'src/app/model/seizure.model';
import { UpdateStateSeizure, newSeizure, updateSeizure } from 'src/app/store/actions/seizure.action';
import { seizureState } from 'src/app/store/reducers/seizure/seizure.reducer';
import { take } from 'rxjs';
import { WarrantyService } from 'src/app/services/warranty/warranty.service';
import { WarrantySharedDataService } from 'src/app/services/warranty/warrantySharedData.service';
import { UpdateStateWarranty, newWarranty, updateWarranty } from 'src/app/store/actions/warranty.action';
import { Warranty } from 'src/app/model/warranty.model';


@Component({
  selector: 'app-warrantyForm',
  templateUrl: './warrantyForm.component.html',
  styleUrls: ['./warrantyForm.component.css']
})
export class WarrantyFormComponent implements OnInit {

  task: string;
  loadings: boolean = false;
  status: seizureState;
  form: FormGroup;

  permissionstitlesType$ = this.store.select(state => state.titleState);
  titles: Titles[] = [];
  selectedTitles;

  prepareDataWarranty: Warranty = {};
  fechaInicio: Date;
  fechaFin: Date;
  maxDate: Date = new Date();
  idWarranty: string = null;

  constructor(private _snackBar: MatSnackBar,
    private store: Store<State>,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private warrantyService: WarrantyService,
    private warrantySharedDataService: WarrantySharedDataService) {

      this.form = this.fb.group({
        selectedTitles: ['', Validators.required],
        fechaInicio: ['', Validators.required],
        fechaFin: [''],
        plazo: [''],
        nombre_tercero: ['', Validators.required],
        identificacion_tercero: ['', Validators.required],
        observacion: ['', Validators.required],
      });


     }

  ngOnInit() {
    this.store.dispatch(UpdateStateWarranty());
    this.store.dispatch(titleList());

    this.store.subscribe(async ({ warrantyList }) => {
      this.status = warrantyList;

      if (this.status.error || this.status.status === 403) {
        let message = warrantyList.error ? warrantyList.error : warrantyList.msg
        this.snackBar(message, warrantyList.status);
      }

      if (this.status.status === 200) {
        let snack = await this.snackBar(warrantyList.msg, warrantyList.status);

        if (snack) {
          this.store.dispatch(UpdateStateSeizure());
          this.goBack();
        }
      }
    });

    this.store.subscribe(({ titleState }) => {

      if (titleState.titleList) {
        this.titles = titleState.titleList;
    
    
        this.warrantySharedDataService.getData().subscribe(valor => {
    
          if (valor.task === 'edit') {
            this.task = "Edición"
    
            this.warrantySharedDataService.getIdWarranty().subscribe(async idWarranty => {
              if (idWarranty) {
                this.getWarranty(idWarranty)
              }
            });
    
          } else {
            this.task = "Creación"
            this.form.get('identificacion_tercero').setValue(null);
            this.form.get('plazo').setValue(0);
          }
    
        });

        this.loadings = true;

      }
    });

  }

  goBack() {
    this.warrantySharedDataService.setData(false, null);
    this.warrantyService.fetchWarrantyList();
  }

  addWarranty() {

    if (this.form.valid) {

      if (this.task === "Edición"){
        this.confirmationService.confirm({
          header: 'Edición de garantía',
          message: '¿Está seguro que desea editar la garantía del título ' + this.selectedTitles.TIPO_ACCIONISTA + ' ' + this.selectedTitles.CONSECUTIVO + ' ?',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: "Aceptar",
          acceptButtonStyleClass: 'p-button-rounded p-button-sm',
          rejectButtonStyleClass: 'p-button-rounded p-button-outlined p-button-sm',
          accept: () => {
            this.submitFormulario();
          }
        });
        
      }else{
        this.confirmationService.confirm({
          header: 'Garantía de título',
          message: '¿Está seguro que desea guardar la garantía del título ' + this.selectedTitles.TIPO_ACCIONISTA + ' ' + this.selectedTitles.CONSECUTIVO + ' ?',
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

  getWarranty(idWarranty: string): void {

    this.warrantyService.getWarraty(idWarranty).pipe(take(1)).subscribe(async warranty => {
      
      if (warranty) {

        this.idWarranty = warranty.ID_REGISTRO;
        this.selectedTitles = this.titles.find( r => r.TITULO_UUID == warranty.titulo.ID_REGISTRO);
        this.fechaInicio = warranty.FECHA_INICIO ? new Date(warranty.FECHA_INICIO) : null;
        this.fechaFin = warranty.FECHA_FIN ? new Date(warranty.FECHA_FIN) : null;
        this.form.get('plazo').setValue(warranty.PLAZO);
        this.form.get('nombre_tercero').setValue(warranty.NOMBRE_TERCERO);
        this.form.get('identificacion_tercero').setValue(warranty.IDENTIFICACION_TERCERO);
        this.form.get('observacion').setValue(warranty.OBSERVACION);
      }

    })
  }


  public async submitFormulario() {

    const diaInicio = this.form.get('fechaInicio').value ? this.form.get('fechaInicio').value.getDate() : null;
    const mesInicio = this.form.get('fechaInicio').value ? this.form.get('fechaInicio').value.getMonth() + 1 : null;
    const añoInicio = this.form.get('fechaInicio').value ? this.form.get('fechaInicio').value.getFullYear() : null;
    const fechaInicioFormateada = this.form.get('fechaInicio').value ? `${diaInicio}-${mesInicio}-${añoInicio}` : null;

    const diaFin = this.form.get('fechaFin').value ? this.form.get('fechaFin').value.getDate() : null;
    const mesFin = this.form.get('fechaFin').value ? this.form.get('fechaFin').value.getMonth() + 1 : null;
    const añoFin = this.form.get('fechaFin').value ? this.form.get('fechaFin').value.getFullYear() : null;
    const fechaFinFormateada = this.form.get('fechaFin').value ? `${diaFin}-${mesFin}-${añoFin}` : null;

    let userPetition = JSON.parse(localStorage.getItem("dataLogin"))

    this.prepareDataWarranty = {
      TITULO_UUID: this.selectedTitles.TITULO_UUID,
      FECHA_INICIO: fechaInicioFormateada,
      FECHA_FIN: fechaFinFormateada,
      PLAZO: this.form.get('plazo').value ? this.form.get('plazo').value : 0,
      NOMBRE_TERCERO: this.form.get('nombre_tercero').value ? this.form.get('nombre_tercero').value : '',
      IDENTIFICACION_TERCERO: this.form.get('identificacion_tercero').value ? this.form.get('identificacion_tercero').value : '',
      OBSERVACION: this.form.get('observacion').value ? this.form.get('observacion').value.toLowerCase() : '',
      EMAILADMIN: userPetition.email,
      ROLADMIN: userPetition.rol.rol
    };

    if (this.task == 'Edición') {
      this.prepareDataWarranty.ID_REGISTRO = this.idWarranty;
      this.store.dispatch(updateWarranty({ warranty: this.prepareDataWarranty }));
    } else {
      
      this.store.dispatch(newWarranty({ warranty: this.prepareDataWarranty }));
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
