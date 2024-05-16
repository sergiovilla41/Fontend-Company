import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/model/state.model';
import { selectAsistenciasActives, selectTotalAsistencias } from 'src/app/store/selectors/asistencias/asistencia.selector';
import { getAsistencias } from 'src/app/store/actions/asistencias.action';
import { AssemblyService } from 'src/app/services/assembly/assembly.service';
import { cerrarVotacion, getCandidateQuestionPlate, getEstadisticasVotacion, getOpcionRespuestaList, saveAsistentesRespuestas } from 'src/app/store/actions/votacion.action';
import { EditAssemblyService } from '../edit-assembly/edit-assembly.service';
import { selectEstadisticasVotacion, selectPlanchas, selectRespuestasListActives, selectVotacionCount } from 'src/app/store/selectors/votacion/votacion.selector';
import { Asistencia } from 'src/app/model/asistencia.model';
import { Filtro, TablaCargar } from 'src/app/interfaces/shareholders.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'edit-assembly-step3',
  templateUrl: 'edit-assembly-step3.component.html',
  styleUrls: ['edit-assembly-step3.component.scss']
})

export class EditAssemblyStep3Component implements OnInit, OnDestroy {
  $respuestas = this.store.select(selectRespuestasListActives);
  planchas$ = this.store.select(selectPlanchas)
  $estadisticasVotacion = this.store.select(selectEstadisticasVotacion)
  asistenciasCount$ = this.store.select(selectTotalAsistencias)
  asistencias$ = this.store.select(selectAsistenciasActives)

  votacionState: boolean = true;
  asistenciasData: Asistencia[];
  idAsamblea: string;
  respuestaAsistentes = []
  idVotacion: string;
  tablaCargar: TablaCargar
  tipoVotacion: string
  subscriptions: Subscription[] = []

  constructor(private store: Store<State>, private assemblyService: AssemblyService, private editAssemblyService: EditAssemblyService) { }

  ngOnInit() {
    this.editAssemblyService.getTipoVotacion().subscribe(tipoVotacion => {
      this.tipoVotacion = tipoVotacion
    });

    this.subscriptions.push(this.editAssemblyService.getIdVotacion().subscribe(id => {
      this.idVotacion = id;
      if((this.tipoVotacion === 'Planchas para la junta directiva')){
        this.store.dispatch(getCandidateQuestionPlate({ VOTACION_UUID: id }));
      }else{
        this.store.dispatch(getOpcionRespuestaList({ VOTACION_UUID: id }));
      }
    }))
    this.assemblyService.getToEditAssembly().subscribe((assembly: any) => this.idAsamblea = assembly.ID_REGISTRO);
    this.asistencias$.subscribe(asistencias => this.asistenciasData = asistencias)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
  }

  cerrarVotacion() {
    this.votacionState = false;
    this.store.dispatch(saveAsistentesRespuestas({saveAsistenteRespuestas: this.asistenciasData.map((value, i) => ({ASISTENTE_UUID: value.ASISTENTE_UUID, CANDIDATO_UUID: this.respuestaAsistentes[i], VOTACION_UUID: this.idVotacion})), asambleaUUID: this.idAsamblea}))
    this.store.dispatch(cerrarVotacion({ votacionUUID: this.idVotacion, asambleaUUID: this.idAsamblea }));
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

    this.store.dispatch(getAsistencias({
      ASAMBLEA_UUID: this.idAsamblea,
      tablaCargar: this.tablaCargar
    }))
  }
}
