import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { VotacionService } from "src/app/services/votacion/votacion.service";
import { actionSuccess, agregarRespuesta, cerrarVotacion, createCandidatePresidentBallot, editarPregunta, getCandidateQuestionPlate, getCandidateQuestionPlateSuccess, getEstadisticasVotacion, getEstadisticasVotacionSuccess, getOpcionRespuestaList, getOpcionRespuestaListSuccess, getVotacionList, getVotacionListSuccess, getVotacionTypes, getVotacionTypesSuccess, postPregunta, saveAsistentesRespuestas, saveRespuestas } from "../../actions/votacion.action";
import { catchError, map, mergeMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Plancha, Votacion, VotacionType } from "src/app/model/votacion.model";
import { Store } from "@ngrx/store";
import { State } from "src/app/model/state.model";
import { TablaCargar } from "src/app/interfaces/shareholders.interface";

@Injectable()
export class VotacionEffect {
  votacionUUID: string;
  tablaCargar: TablaCargar;
  ASAMBLEA_UUID: string
  constructor(private $actions: Actions, private votacionService: VotacionService, private store: Store<State>) { }

  getVotacionTypes$ = createEffect(() => this.$actions.pipe(
    ofType(getVotacionTypes),
    mergeMap(() => this.votacionService.getVotacionTypes()
      .pipe(
        map((votacionTypes: VotacionType[]) => {
          return getVotacionTypesSuccess({votacionTypes})
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

  getVotacionList$ = createEffect(() => this.$actions.pipe(
    ofType(getVotacionList),
    mergeMap(({tablaCargar,ASAMBLEA_UUID}) => this.votacionService.getVotacionList(tablaCargar, ASAMBLEA_UUID)
      .pipe(
        map(({ rows, count }) => {
          this.tablaCargar = tablaCargar
          this.ASAMBLEA_UUID = ASAMBLEA_UUID
          return getVotacionListSuccess({ rows, count })
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

  postPregunta$ = createEffect(() => this.$actions.pipe(
    ofType(postPregunta),
    mergeMap(({ nuevaPregunta }) => this.votacionService.postPregunta(nuevaPregunta)
      .pipe(
        map((response: { msg: string, status: number }) => {
          this.store.dispatch(actionSuccess({ msg: response.msg, status: response.status }))
          return getVotacionList({tablaCargar: this.tablaCargar, ASAMBLEA_UUID: this.ASAMBLEA_UUID})
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

  editarPregunta$ = createEffect(() => this.$actions.pipe(
    ofType(editarPregunta),
    mergeMap(({ nuevaPregunta }) => this.votacionService.editarPregunta(nuevaPregunta)
      .pipe(
        map((response: { msg: string, status: number }) => {
          this.store.dispatch(actionSuccess({ msg: response.msg, status: response.status }))
          return getVotacionList({tablaCargar: this.tablaCargar, ASAMBLEA_UUID: this.ASAMBLEA_UUID})
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

  getOpcionRespuestaList$ = createEffect(() => this.$actions.pipe(
    ofType(getOpcionRespuestaList),
    mergeMap(({ VOTACION_UUID }) => this.votacionService.getOpcionRespuestaList(VOTACION_UUID)
      .pipe(
        map(({ rows }) => {
          this.votacionUUID = VOTACION_UUID;
          return getOpcionRespuestaListSuccess({ rows })
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

  agregarRespuesta$ = createEffect(() => this.$actions.pipe(
    ofType(agregarRespuesta),
    mergeMap(({ respuesta }) => this.votacionService.agregarRespuesta(respuesta, this.votacionUUID)
      .pipe(
        map(() => {
          return getOpcionRespuestaList({ VOTACION_UUID: this.votacionUUID })
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

  saveRespuestas$ = createEffect(() => this.$actions.pipe(
    ofType(saveRespuestas),
    mergeMap(({ respuestas }) => this.votacionService.saveRespuestas(respuestas)
      .pipe(
        map(() => {
          return getOpcionRespuestaList({ VOTACION_UUID: this.votacionUUID })
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

  getEstadisticasVotacion$ = createEffect(() => this.$actions.pipe(
    ofType(getEstadisticasVotacion),
    mergeMap(({asambleaUUID}) => this.votacionService.getEstadisticasVotacion(asambleaUUID)
      .pipe(
        map(({rows}) => {
          return getEstadisticasVotacionSuccess({ estadisticas: rows[0] })
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

  cerrarVotacion$ = createEffect(() => this.$actions.pipe(
    ofType(cerrarVotacion),
    mergeMap(({votacionUUID, asambleaUUID}) => this.votacionService.cerrarVotacion(votacionUUID)
      .pipe(
        map(() => {
          return getEstadisticasVotacion({asambleaUUID})
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

  saveAsistentesRespuestas$ = createEffect(() => this.$actions.pipe(
    ofType(saveAsistentesRespuestas),
    mergeMap(({saveAsistenteRespuestas, asambleaUUID}) => this.votacionService.saveAsistentesRespuestas(saveAsistenteRespuestas)
      .pipe(
        map(() => {
          return getEstadisticasVotacion({asambleaUUID})
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

  getCandidateQuestionPlate$ = createEffect(() => this.$actions.pipe(
    ofType(getCandidateQuestionPlate),
    mergeMap(({VOTACION_UUID}) => this.votacionService.getCandidateQuestionPlate(VOTACION_UUID)
      .pipe(
        map((planchas: Plancha[]) => {
          return getCandidateQuestionPlateSuccess({rows: planchas})
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

  createCandidatePresidentBallot$ = createEffect(() => this.$actions.pipe(
    ofType(createCandidatePresidentBallot),
    mergeMap(({planchas, VOTACION_UUID}) => this.votacionService.createCandidatePresidentBallot(planchas, VOTACION_UUID)
      .pipe(
        map(() => {
          return getCandidateQuestionPlate({VOTACION_UUID: this.votacionUUID})
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

}
