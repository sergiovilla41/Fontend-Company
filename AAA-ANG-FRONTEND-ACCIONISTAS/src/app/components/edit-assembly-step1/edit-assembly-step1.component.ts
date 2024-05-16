import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditAssemblyService } from '../edit-assembly/edit-assembly.service';
import { Votacion, VotacionType } from 'src/app/model/votacion.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from 'src/app/model/state.model';
import { selectVotacionCount, selectVotacionList, selectVotacionTypes } from 'src/app/store/selectors/votacion/votacion.selector';
import { clearStateVotacion, editarPregunta, getVotacionList, getVotacionTypes, postPregunta } from 'src/app/store/actions/votacion.action';
import { ConfirmationService } from 'primeng/api';
import { AssemblyService } from 'src/app/services/assembly/assembly.service';
import { EditActions } from '../edit-assembly/edit-assembly.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Filtro, TablaCargar } from 'src/app/interfaces/shareholders.interface';

@Component({
  selector: 'edit-assembly-step1',
  templateUrl: 'edit-assembly-step1.component.html',
  styleUrls: ['edit-assembly-step1.component.scss']
})

export class EditAssemblyStep1Component implements OnInit {
  tipoVotaciones$ = this.store.select(selectVotacionTypes);
  votaciones$ = this.store.select(selectVotacionList)
  votacionCount$ = this.store.select(selectVotacionCount)

  action: string | null;
  estadoOptions = ['Activo', 'Cerrado']

  selectedVotacion: Votacion;
  form: FormGroup = this.fb.group({
    tipoVotacion: [null, Validators.required],
    descripcionObjetivo: ['', Validators.required],
    estado: ['', Validators.required]
  })
  ASAMBLEA_UUID: string;
  idVotacion: string;
  tablaCargar: TablaCargar

  constructor(private editAssemblyService: EditAssemblyService, private store: Store<State>, private fb: FormBuilder,
    private confirmationService: ConfirmationService, private assemblyService: AssemblyService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.store.dispatch(getVotacionTypes())
    this.editAssemblyService.getActiveAction().subscribe(action => {
      this.action = action;
    })
    this.assemblyService.getToEditAssembly().subscribe((assembly: any) => this.ASAMBLEA_UUID = assembly.ID_REGISTRO);

    this.editAssemblyService.getVotacionEditing().subscribe((votacion: Votacion) => {
      if (votacion) {
        this.idVotacion = votacion.VOTACION_UUID;
        this.tipoVotaciones$.subscribe(votaciones => {
          this.form.setValue({
            tipoVotacion: votaciones?.filter(el => el.ID_REGISTRO === votacion.TIPO_VOTACION_UUID)[0],
            descripcionObjetivo: votacion.DESCRIPCION,
            estado: votacion.ESTADO
          })
        })
      } else {
        this.form.reset();
      }
    })

    this.store.subscribe(({votacion}) => {
      if(votacion.status === 200){
        this.snackBar(votacion.msg, votacion.status);
        this.store.dispatch(clearStateVotacion());
        this.form.reset();
      }
    })
  }

  loadAsistencias($event: { first: number, rows: number, filters?: any }) {
    const filterValues: Filtro[] = [];

    for (let key in $event.filters) {
      if ($event.filters[key].value !== null && $event.filters[key].value != "") {
        filterValues.push({
          columna: key,
          valor: $event.filters[key].value,
        });
      }
    }

    this.tablaCargar = {
      first: $event.first,
      rows: $event.rows,
      filtro: filterValues
    }

    this.store.dispatch(getVotacionList({
      tablaCargar: this.tablaCargar,
      ASAMBLEA_UUID: this.ASAMBLEA_UUID
    }))
  }

  snackBar(message, status) {
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

  onCancelar() {
    this.editAssemblyService.setActiveAction(null);
    this.editAssemblyService.deleteVotacionEditing();
  }

  onChangeSelection() {
    this.editAssemblyService.setVotacionSelected(this.selectedVotacion)
    if (this.action === null || this.action === 'null') {
      this.editAssemblyService.setTipoVotacion((this.selectedVotacion) ? this.selectedVotacion.TIPO_VOTACION : null)
      this.editAssemblyService.setIdVotacion(this.selectedVotacion?.VOTACION_UUID)
    }
  }

  onSiguiente() {
    if(this.form.valid){
      this.confirmationService.confirm({
        header: 'Crear votación',
        message: '¿Está seguro de continuar y guardar la votación actual?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: "Aceptar",
        acceptButtonStyleClass: 'p-button-rounded p-button-sm',
        rejectButtonStyleClass: 'p-button-rounded p-button-outlined p-button-sm',
        accept: () => {
          this.editAssemblyService.setTipoVotacion(this.form.get('tipoVotacion').value)
          if(this.action === EditActions.nuevo){
            this.store.dispatch(postPregunta({
              nuevaPregunta: {
                ASAMBLEA_UUID: this.ASAMBLEA_UUID,
                ES_VISIBLE: this.form.get('estado').value === 'Activo' ? 1 : 0,
                DESCRIPCION: this.form.get('descripcionObjetivo').value,
                TIPO_VOTACION_UUID: this.form.get('tipoVotacion').value.ID_REGISTRO
              }
            }))
          }else{
            this.store.dispatch(editarPregunta({
              nuevaPregunta: {
                VOTACION_UUID: this.idVotacion,
                ASAMBLEA_UUID: this.ASAMBLEA_UUID,
                ES_VISIBLE: this.form.get('estado').value === 'Activo' ? 1 : 0,
                DESCRIPCION: this.form.get('descripcionObjetivo').value,
                TIPO_VOTACION_UUID: this.form.get('tipoVotacion').value.ID_REGISTRO
              }
            }))
            this.editAssemblyService.setIdVotacion(this.idVotacion)
          }
          this.editAssemblyService.setActiveStep('1')
        }
      })
    }else{

    }

  }

  onGuardar() {
    if (this.form.valid) {
      this.confirmationService.confirm({
        header: 'Crear votación',
        message: '¿Está seguro de crear la votación?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: "Aceptar",
        acceptButtonStyleClass: 'p-button-rounded p-button-sm',
        rejectButtonStyleClass: 'p-button-rounded p-button-outlined p-button-sm',
        accept: () => {
          this.store.dispatch(postPregunta({
            nuevaPregunta: {
              ASAMBLEA_UUID: this.ASAMBLEA_UUID,
              ES_VISIBLE: this.form.get('estado').value === 'Activo' ? 1 : 0,
              DESCRIPCION: this.form.get('descripcionObjetivo').value,
              TIPO_VOTACION_UUID: this.form.get('tipoVotacion').value.ID_REGISTRO
            }
          }))
        }
      })
    } else {
      this.form.markAllAsTouched()
    }
  }

  onEdit() {
    if (this.form.valid) {
      this.confirmationService.confirm({
        header: 'Editar votación',
        message: '¿Está seguro de editar la votación?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: "Aceptar",
        acceptButtonStyleClass: 'p-button-rounded p-button-sm',
        rejectButtonStyleClass: 'p-button-rounded p-button-outlined p-button-sm',
        accept: () => {
          this.store.dispatch(editarPregunta({
            nuevaPregunta: {
              VOTACION_UUID: this.idVotacion,
              ASAMBLEA_UUID: this.ASAMBLEA_UUID,
              ES_VISIBLE: this.form.get('estado').value === 'Activo' ? 1 : 0,
              DESCRIPCION: this.form.get('descripcionObjetivo').value,
              TIPO_VOTACION_UUID: this.form.get('tipoVotacion').value.ID_REGISTRO
            }
          }))
        }
      })
    } else {
      this.form.markAllAsTouched()
    }
  }
}
