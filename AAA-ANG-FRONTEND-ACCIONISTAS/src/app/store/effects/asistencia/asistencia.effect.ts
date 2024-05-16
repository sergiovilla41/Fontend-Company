import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { VotacionService } from "src/app/services/votacion/votacion.service";
import { getVotacionList, getVotacionListSuccess, getVotacionTypes, getVotacionTypesSuccess } from "../../actions/votacion.action";
import { catchError, map, mergeMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Votacion, VotacionType } from "src/app/model/votacion.model";
import { AsistenciaService } from "src/app/services/asistencia/asistencia.service";
import { getAsistencias, getAsistenciasSuccess, getDataCloseAssembly, getDataCloseAssemblySuccess, getTypeAsistantList, getTypeAsistantListSuccess, postAsistencia, saveAsistencias, setStatusAsistencias } from "../../actions/asistencias.action";
import { Asistencia, TypeAsistent } from "src/app/model/asistencia.model";
import { TablaCargar } from "src/app/interfaces/shareholders.interface";

@Injectable()
export class AsistenciaEffect{
  tablaCargar: TablaCargar
  constructor(private $actions: Actions, private asistenciaService: AsistenciaService){}

  getAsistencias$ = createEffect(() => this.$actions.pipe(
    ofType(getAsistencias),
    mergeMap(({ASAMBLEA_UUID, tablaCargar}) => this.asistenciaService.getAsistencias(ASAMBLEA_UUID, tablaCargar)
      .pipe(
        map(({rows, count}) => {
          this.tablaCargar = tablaCargar;
          return getAsistenciasSuccess({asistencias: rows.map(el => ({...el, isPresent: el.ACTIVO === 1})), count})
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

  getTypeAsistantList$ = createEffect(() => this.$actions.pipe(
    ofType(getTypeAsistantList),
    mergeMap(() => this.asistenciaService.getTypeAsistantList()
      .pipe(
        map((typeAsistenciaList: TypeAsistent[]) => {
          return getTypeAsistantListSuccess({typeAsistenciaList})
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

  postAsistencia$ = createEffect(() => this.$actions.pipe(
    ofType(postAsistencia),
    mergeMap(({asistencia}) => this.asistenciaService.postAsistencia(asistencia)
      .pipe(
        map((response: {msg: string, status: number}) => {
          return setStatusAsistencias({msg: response.msg, status: response.status})
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

  saveAsistencias$ = createEffect(() => this.$actions.pipe(
    ofType(saveAsistencias),
    mergeMap(({asistencias}) => this.asistenciaService.saveAsistencia(asistencias)
      .pipe(
        map((response: {msg: string, status: number}) => {
          return setStatusAsistencias({msg: response.msg, status: response.status})
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

  getDataCloseAssembly$ = createEffect(() => this.$actions.pipe(
    ofType(getDataCloseAssembly),
    mergeMap(({ASAMBLEA_UUID}) => this.asistenciaService.getDataCloseAssembly(ASAMBLEA_UUID)
      .pipe(
        map((response) => {
          return getDataCloseAssemblySuccess({data: response})
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));
}
