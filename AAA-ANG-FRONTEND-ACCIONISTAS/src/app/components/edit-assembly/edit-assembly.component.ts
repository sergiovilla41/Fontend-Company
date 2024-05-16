import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AssemblyService } from 'src/app/services/assembly/assembly.service';
import { EditAssemblyService } from './edit-assembly.service';
import { OpcionRespuesta, Votacion } from 'src/app/model/votacion.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditAssemblyStep2Service } from '../edit-assembly-step2/edit-assembly-step2.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/model/state.model';
import { saveRespuestas } from 'src/app/store/actions/votacion.action';
import { selectRespuestasList, selectVotacionCount } from 'src/app/store/selectors/votacion/votacion.selector';
import { selectTotalAsistencias } from 'src/app/store/selectors/asistencias/asistencia.selector';
import { Filtro, TablaCargar } from 'src/app/interfaces/shareholders.interface';

export enum EditActions {
  nuevo = 'nuevo',
  editar = 'editar',
  verificarQuorum = 'verificarQuorum',
  registroRespuestas = 'registroRespuestas'
}

@Component({
  selector: 'edit-assembly',
  templateUrl: 'edit-assembly.component.html',
  styleUrls: ['edit-assembly.component.scss']
})
export class EditAssemblyComponent implements OnInit {
  $respuestas = this.store.select(selectRespuestasList);
  votacionCount$ = this.store.select(selectVotacionCount)
  asistenciasCount$ = this.store.select(selectTotalAsistencias)

  menuItems = [
    { label: 'Detalle' },
    { label: 'Registro de asistencia' },
    { label: 'Votaciones' },
    { label: 'Dividendos' },
    { label: 'Liquidación' },
    { label: 'Cierre de asamblea' },
  ]
  activeItem: MenuItem;
  idAsamblea: string;
  tablaCargar: TablaCargar

  steps: MenuItem[] = [{
    label: 'Registro de votación'
  },
  {
    label: 'Redactar respuestas'
  },
  {
    label: 'Registro de votaciones'
  }]
  activeStep: number;
  disabled: boolean;
  selectedVotacion: Votacion;
  assemblyTypes: any;
  form = this.fb.group({
    assemblyType: ['', Validators.required],
    assemblyDate: [new Date(), Validators.required],
    sendConfirmation: ['No', Validators.required],
    descripcion: ['', Validators.required]
  })
  tipoVotacion: string;
  descripcion: string;
  id_registro;

  constructor(private assemblyService: AssemblyService, private editAssemblyService: EditAssemblyService, private confirmationService: ConfirmationService, private fb: FormBuilder, private _snackBar: MatSnackBar, private editStep2Service: EditAssemblyStep2Service, private store: Store<State>) { }

  ngOnInit() {
    this.editAssemblyService.getActiveMenuItem().subscribe(active => {
      if (active === 'null' || active === null) {
        this.activeItem = this.menuItems[0];
      } else {
        this.activeItem = this.menuItems.find(el => el.label === active);
      }
    })
    this.editAssemblyService.getActiveStep().subscribe(step => {
      this.activeStep = (step === null || step === 'null') ? 0 : parseInt(step);
    })
    this.editAssemblyService.getVotacionSelected().subscribe(votacion => {
      this.selectedVotacion = votacion;
    })
    this.assemblyService.getToEditAssembly().subscribe((assembly: any) => this.idAsamblea = assembly.ID_REGISTRO);


    this.editAssemblyService.getActiveAction().subscribe(action => {
      this.disabled = action !== null && action !== 'null'
    })

    this.assemblyService.getToEditAssembly().subscribe((assembly: any) => {
      if (assembly) {
        this.descripcion = assembly.DESCRIPCION
        this.id_registro = assembly.ID_REGISTRO
        this.form.setValue({
          assemblyType: this.form.get('assemblyType').value,
          assemblyDate: new Date(assembly.FECHA_ASAMBLEA),
          descripcion: assembly.OBSERVACION,
          sendConfirmation: 'No'
        })
      }

    })
    this.assemblyService.getAssemblyTypeList().subscribe(value => {
      this.assemblyTypes = value
      this.form.setValue({
        assemblyType: this.assemblyTypes.find(element => element.DESCRIPCION === this.descripcion).ID_REGISTRO,
        assemblyDate: this.form.get('assemblyDate').value,
        descripcion: this.form.get('descripcion').value,
        sendConfirmation: 'No'
      })
    })



    this.editAssemblyService.getTipoVotacion().subscribe(tipoVotacion => this.tipoVotacion = tipoVotacion);
  }



  goBack() {
    this.assemblyService.setIsEditAssemblyOpen(false);
    this.editAssemblyService.setActiveMenuItem(null)
    this.editStep2Service.setComentarios(null)
  }

  onActiveItemChange($event) {
    this.editAssemblyService.setActiveMenuItem($event.label);
  }

  onActiveStepChange($event) {
    if ((this.tipoVotacion === null || this.tipoVotacion === 'null') && $event !== 0) {
      this.confirmationService.confirm({
        key: 'editModal',
        header: 'No has seleccionado ningún elemento',
        message: "Para registrar los votos de la votación debes seleccionar el elemento y dar click en el paso 2",
        rejectVisible: false,
        acceptVisible: false
      })
    } else {
      if(this.activeStep === 1 && $event === 0){
        this.editAssemblyService.setTipoVotacion(null)
      }

      this.editAssemblyService.setActiveStep($event)
      if ($event === 0) {
        this.editStep2Service.setComentarios(null)
      }
    }
  }

  onNuevo() {
    this.editAssemblyService.setActiveAction(EditActions.nuevo)
  }

  onEditar() {
    if (this.selectedVotacion) {
      this.editAssemblyService.saveVotacionSelected();
      this.editAssemblyService.setActiveAction(EditActions.editar)
    }
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

  exportPdf() {
    this.editAssemblyService.exportPdf(this.idAsamblea, this.tablaCargar).subscribe(response => {

      const csv = response; // Contenido del archivo en formato csv
      // Crear el archivo blob
      const blob = new Blob([csv], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      // Cambiar el nombre del archivo
      const fechaActual = new Date();
      const year = fechaActual.getFullYear();
      const month = fechaActual.getMonth() + 1;
      const day = fechaActual.getDate();
      const hours = fechaActual.getHours();
      const minutes = fechaActual.getMinutes();
      const seconds = fechaActual.getSeconds();
      const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
      let fileName = "Traslados " + fechaFormateada + ".pdf";

      // Crear enlace para descargar el archivo
      const link = document.createElement('a');
      link.download = fileName;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      //window.open(URL.createObjectURL(new Blob([response], {type: 'application/pdf'})));
    })
  }


  exportCsv() {
    this.editAssemblyService.exportCsv(this.idAsamblea, this.tablaCargar).subscribe(response => {
      const csv = response; // Contenido del archivo en formato csv
      // Crear el archivo blob
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      // Cambiar el nombre del archivo
      const fechaActual = new Date();
      const year = fechaActual.getFullYear();
      const month = fechaActual.getMonth() + 1;
      const day = fechaActual.getDate();
      const hours = fechaActual.getHours();
      const minutes = fechaActual.getMinutes();
      const seconds = fechaActual.getSeconds();
      const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
      let fileName = "Traslados " + fechaFormateada + ".csv";

      // Crear enlace para descargar el archivo
      const link = document.createElement('a');
      link.download = fileName;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);


    })
  }

  exportExcel() {
    this.editAssemblyService.exportExcel(this.idAsamblea, this.tablaCargar).subscribe(response => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);

      // Cambiar el nombre del archivo
      const fechaActual = new Date();
      const year = fechaActual.getFullYear();
      const month = fechaActual.getMonth() + 1;
      const day = fechaActual.getDate();
      const hours = fechaActual.getHours();
      const minutes = fechaActual.getMinutes();
      const seconds = fechaActual.getSeconds();
      const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
      let fileName = "Registro de asistentes " + fechaFormateada;

      // Crear enlace para descargar el archivo
      const link = document.createElement('a');
      link.download = fileName;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
  }


  guardarAndNuevo() {
    if (this.form.valid) {
      this.assemblyService.updateAssembly({
        ID_REGISTRO: this.id_registro,
        TIPO_UUID: this.form.get('assemblyType').value,
        FECHA_ASAMBLEA: this.form.get('assemblyDate').value,
        NOTIFICAR_ASISTENTES: (this.form.get('sendConfirmation').value === 'Si') ? 1 : 0,
        OBSERVACION: this.form.get('descripcion').value,
        EMAILADMIN: JSON.parse(localStorage.getItem('dataLogin')).email,
        ROLADMIN: JSON.parse(localStorage.getItem('dataLogin')).rol.rol
      }).subscribe((res: any) => {
        this.snackBar(res.msg, res.status)
        this.assemblyService.setIsAddAssemblyOpen(true)
        this.assemblyService.getAssemblyList();
      })
    } else {
      this.form.markAsTouched()
    }
  }
}
