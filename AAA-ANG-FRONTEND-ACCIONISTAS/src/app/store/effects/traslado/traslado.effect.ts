import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { ResponseInterface } from "src/app/model/response.model";
import { TitlesService } from "src/app/services/titles/titles.service";
import { TrasladoService } from "src/app/services/traslado/traslado.service";
import { deleteTranslate, editTransferTitle, getIncompleteTitles, getIncompleteTitlesSuccess, getTitlesListSelector, getTitlesListSelectorSuccess, getTranslatesListSuccess, getTraslatesList, setStatusTraslados, transferTitle } from "../../actions/traslado.action";
import { Traslado } from "src/app/model/traslado.model";
import { Titles } from "src/app/model/titles.model";
import { Store } from "@ngrx/store";
import { State } from "src/app/model/state.model";

@Injectable()
export class TrasladoEffect {
  constructor(private actions$: Actions, private trasladoService: TrasladoService, private store: Store<State>) { }

  getTraslates$ = createEffect(() => this.actions$.pipe(
    ofType(getTraslatesList),
    mergeMap(({ tablaCargar }) => this.trasladoService.getTranslatesList(tablaCargar)
      .pipe(
        map((respuesta: { count: number, rows: Traslado[] }) => {
          return getTranslatesListSuccess({ translates: respuesta.rows, count: respuesta.count })
        }),
        catchError((err: HttpErrorResponse) => {
          return []
        })
      )
    )
  ));

  getTitlesListSelector$ = createEffect(() => this.actions$.pipe(
    ofType(getTitlesListSelector),
    mergeMap(() => this.trasladoService.getTitlesListSelector()
      .pipe(
        map((respuesta: Titles[]) => {
          return getTitlesListSelectorSuccess({ titlesListSelector: respuesta })
        }),
        catchError((err: HttpErrorResponse) => {
          return []
        })
      )
    )
  ));

  getIncompleteTitles$ = createEffect(() => this.actions$.pipe(
    ofType(getIncompleteTitles),
    mergeMap(() => this.trasladoService.getIncompleteTitles()
      .pipe(
        map((respuesta: Titles[]) => {
          return getIncompleteTitlesSuccess({ titles: respuesta })
        }),
        catchError((err: HttpErrorResponse) => {
          return []
        })
      )
    )
  ));

  transferTitle$ = createEffect(() => this.actions$.pipe(
    ofType(transferTitle),
    mergeMap(({ acciones }) => this.trasladoService.transferTitle(acciones)
      .pipe(
        map((respuesta: { msg: string, status: number }) => {
          this.store.dispatch(setStatusTraslados({ msg: respuesta.msg, status: respuesta.status }))
          return getTraslatesList({ tablaCargar: { first: 0, rows: 10 } })
        }),
        catchError((err: HttpErrorResponse) => {
          return []
        })
      )
    )
  ));

  deleteTranslate$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTranslate),
    mergeMap(({ ID_REGISTRO }) => this.trasladoService.deleteTranslate(ID_REGISTRO)
      .pipe(
        map((respuesta: { msg: string, status: number }) => {
          this.store.dispatch(setStatusTraslados({ msg: respuesta.msg, status: respuesta.status }))
          return getTraslatesList({ tablaCargar: { first: 0, rows: 10 } })
        }),
        catchError((err: HttpErrorResponse) => {
          return []
        })
      )
    )
  ));

  editTransferTitle$ = createEffect(() => this.actions$.pipe(
    ofType(editTransferTitle),
    mergeMap(({ acciones }) => this.trasladoService.editTransferTitle(acciones)
      .pipe(
        map((respuesta: { msg: string, status: number }) => {
          this.store.dispatch(setStatusTraslados({ msg: respuesta.msg, status: respuesta.status }))
          return getTraslatesList({ tablaCargar: { first: 0, rows: 10 } })
        }),
        catchError((err: HttpErrorResponse) => {
          return []
        })
      )
    )
  ));
}
