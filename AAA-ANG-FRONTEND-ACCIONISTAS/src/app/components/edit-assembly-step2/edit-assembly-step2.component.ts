import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditAssemblyService } from '../edit-assembly/edit-assembly.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/model/state.model';
import { agregarRespuesta, createCandidatePresidentBallot, getCandidateQuestionPlate, getOpcionRespuestaList, saveRespuestas } from 'src/app/store/actions/votacion.action';
import { selectPlanchas, selectRespuestasList } from 'src/app/store/selectors/votacion/votacion.selector';
import { OpcionRespuesta } from 'src/app/model/votacion.model';
import { EditAssemblyStep2Service } from './edit-assembly-step2.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'edit-assembly-step2',
  templateUrl: 'edit-assembly-step2.component.html',
  styleUrls: ['edit-assembly-step2.component.scss']
})

export class EditAssemblyStep2Component implements OnInit, OnDestroy {
  $respuestas = this.store.select(selectRespuestasList);

  subscriptions: Subscription[] = []
  respuestas: OpcionRespuesta[];
  selectedRespuestas: OpcionRespuesta[] = []
  nuevaRespuesta = ''
  comentarios: Map<string, boolean> = new Map();
  visible = false;
  asambleaNombre = ""
  indexPlancha: number;
  nombrePersona = ""
  planchas: {respuesta: string, tipo?: string, personas?: {name: string}[]}[] = [
    {
      respuesta: 'En blanco'
    },
    {
      respuesta: 'Me abstengo'
    },
    {
      respuesta: 'En contra'
    }
  ]

  tipoVotacion: string;
  VOTACION_UUID: string
  constructor(private editAssemblyService: EditAssemblyService, private store: Store<State>, private editStep2Service: EditAssemblyStep2Service) { }

  ngOnInit() {
    this.editAssemblyService.getTipoVotacion().subscribe(tipoVotacion => {
      this.tipoVotacion = tipoVotacion
    });
    this.subscriptions.push(this.editAssemblyService.getIdVotacion().subscribe(id => {
      this.VOTACION_UUID = id
      if(!(this.tipoVotacion === 'Planchas para la junta directiva')){
        this.store.dispatch(getOpcionRespuestaList({ VOTACION_UUID: id }));
      }
    }))

    this.editStep2Service.getComentarios().subscribe(comentarios => {
      if (comentarios) {
        this.comentarios = comentarios;
      }
    })

    this.subscriptions.push(this.$respuestas.subscribe(val => {
      this.selectedRespuestas = val?.filter(el => el.ESTADO === 1)
      this.respuestas = val
    }));
  }

  ngOnDestroy(): void {
    if(this.tipoVotacion === 'Planchas para la junta directiva'){
      this.store.dispatch(createCandidatePresidentBallot({planchas: this.planchas, VOTACION_UUID: this.VOTACION_UUID}))
    }else{
      this.store.dispatch(saveRespuestas({ respuestas: this.respuestas?.filter(r => this.selectedRespuestas?.findIndex(f => f.ID_REGISTRO === r.ID_REGISTRO) === -1).map(el => ({ ...el, ESTADO: 0 })).concat(...this.selectedRespuestas.map(el => ({ ...el, ESTADO: 1 }))) }))
    }
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  addAsamblea(){
    this.planchas.unshift({respuesta: this.asambleaNombre, tipo: 'plancha', personas: []})
    this.asambleaNombre = ""
  }

  changeComentario(key: string) {
    this.comentarios.set(key, !this.comentarios.get(key))
    this.editStep2Service.setComentarios(this.comentarios);
  }

  agregarRespuesta() {
    this.store.dispatch(agregarRespuesta({ respuesta: this.nuevaRespuesta }));
    this.nuevaRespuesta = ''
  }

  deletePlancha(i: number){
    this.planchas.splice(i, 1)
  }

  deletePersona(iPlancha: number, iPersona: number){
    this.planchas[iPlancha].personas.splice(iPersona, 1)
  }

  agregarPersona(){
    this.planchas[this.indexPlancha].personas.push({name: this.nombrePersona})
    this.indexPlancha = undefined;
    this.nombrePersona = "";
  }
}
