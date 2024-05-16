import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { LiquidacionService } from "src/app/services/liquidacion/liquidacion.service";
import { actualizarLiquidacion, getLiquidacionEstados, getLiquidacionEstadosSuccess, getLiquidacionList, getLiquidacionListSuccess, liquidarMasivamente, liquidarMasivamenteSuccess, liquidarPorAccionista, liquidarPorAccionistaSuccess } from "../../actions/liquidacion.action";
import { Store } from "@ngrx/store";
import { State } from "src/app/model/state.model";
import { LiquidacionEstado } from "src/app/model/liquidacion.model";

@Injectable()
export class LiquidacionEffect {
  tablaCargar
  asambleaUUID
  constructor(private $actions: Actions, private liquidacionService: LiquidacionService, private store: Store<State>) { }

  getLiquidacionList$ = createEffect(() => this.$actions.pipe(
    ofType(getLiquidacionList),
    mergeMap(({ tablaCargar, ASAMBLEA_UUID }) => this.liquidacionService.getLiquidacionList(tablaCargar, ASAMBLEA_UUID)
      .pipe(
        map(({ rows, count }) => {
          this.tablaCargar = tablaCargar;
          this.asambleaUUID = ASAMBLEA_UUID
          return getLiquidacionListSuccess({ liquidacionList: rows, totalRows: count })
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

  liquidarMasivamente$ = createEffect(() => this.$actions.pipe(
    ofType(liquidarMasivamente),
    mergeMap(({ ASAMBLEA_UUID, TIPO_ACCIONISTA }) => this.liquidacionService.liquidarMasivamente(ASAMBLEA_UUID, TIPO_ACCIONISTA)
      .pipe(
        map(({ msg, status }) => {
          this.store.dispatch(liquidarMasivamenteSuccess({ msg, status }))
          return getLiquidacionList({ tablaCargar: this.tablaCargar, ASAMBLEA_UUID: this.asambleaUUID })
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

  liquidarPorAccionista$ = createEffect(() => this.$actions.pipe(
    ofType(liquidarPorAccionista),
    mergeMap(({ ASAMBLEA_UUID, CUOTAS, TITULO_UUID }) => this.liquidacionService.liquidarPorAccionista(TITULO_UUID, ASAMBLEA_UUID, CUOTAS)
      .pipe(
        map(({ msg, status }) => {
          this.store.dispatch(liquidarPorAccionistaSuccess({ msg, status }))
          return getLiquidacionList({ tablaCargar: this.tablaCargar, ASAMBLEA_UUID: this.asambleaUUID })
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

  getLiquidacionEstados$ = createEffect(() => this.$actions.pipe(
    ofType(getLiquidacionEstados),
    mergeMap(() => this.liquidacionService.getLiquidacionEstados()
      .pipe(
        map((liquidacionEstados: LiquidacionEstado[]) => {
          return getLiquidacionEstadosSuccess({liquidacionEstados})
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

  actualizarLiquidacion$ = createEffect(() => this.$actions.pipe(
    ofType(actualizarLiquidacion),
    mergeMap(({ ESTADO_UUID, ID_REGISTRO }) => this.liquidacionService.editarLiquidacion(ID_REGISTRO, ESTADO_UUID)
      .pipe(
        map(({ msg, status }) => {
          this.store.dispatch(liquidarPorAccionistaSuccess({ msg, status }))
          return getLiquidacionList({ tablaCargar: this.tablaCargar, ASAMBLEA_UUID: this.asambleaUUID })
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

}
