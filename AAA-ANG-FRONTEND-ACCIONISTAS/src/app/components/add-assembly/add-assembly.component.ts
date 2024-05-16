import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AssemblyService } from 'src/app/services/assembly/assembly.service';
import { Validators } from '@angular/forms';
import { State } from 'src/app/model/state.model';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'add-assembly',
  templateUrl: 'add-assembly.component.html',
  styleUrls: ['add-assembly.component.scss']
})

export class AddAssemblyComponent implements OnInit {
  assemblyTypes: any
  value: string = '';
  form = this.fb.group({
    tipoAsamblea: ['', Validators.required],
    fechaAsamblea: ['', Validators.required],
    notificacion: ['', Validators.required],
    detalle: ['', Validators.required]
  })

  constructor(private assemblyService: AssemblyService, private fb: FormBuilder, private _snackBar: MatSnackBar, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.assemblyService.getAssemblyTypeList().subscribe(value => this.assemblyTypes = value)
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

  goBack() {
    this.assemblyService.setIsAddAssemblyOpen(false)
  }

  guardar() {
    if (this.form.valid) {

      this.confirmationService.confirm({
        header: 'Creación de Asamblea',
        message: '¿Está seguro de crear la asamblea?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: "Aceptar",
        acceptButtonStyleClass: 'p-button-rounded p-button-sm',
        rejectButtonStyleClass: 'p-button-rounded p-button-outlined p-button-sm',
        accept: () => {
          this.assemblyService.addAssembly({
            TIPO_UUID: this.form.get('tipoAsamblea').value,
            FECHA_ASAMBLEA: this.form.get('fechaAsamblea').value,
            NOTIFICAR_ASISTENTES: (this.form.get('notificacion').value === 'Si') ? 1 : 0,
            OBSERVACION: this.form.get('detalle').value,
            EMAILADMIN: JSON.parse(localStorage.getItem('dataLogin')).email,
            ROLADMIN: JSON.parse(localStorage.getItem('dataLogin')).rol.rol
          }).subscribe((res: any) => {
            this.snackBar(res.msg, res.status)
            this.assemblyService.setIsAddAssemblyOpen(false)
            this.assemblyService.getAssemblyList();
          })
        }
      })

    } else {
      this.form.markAllAsTouched()
    }
  }
}
