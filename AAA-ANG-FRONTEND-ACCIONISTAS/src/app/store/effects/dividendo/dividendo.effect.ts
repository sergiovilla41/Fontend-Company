import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { ResponseInterface } from "src/app/model/response.model";
import { DividendoService } from "src/app/services/dividendo/dividendo.service";
import { addDividendo, addDividendoSuccess, distributeDividendo, distributeDividendoSuccess} from "../../actions/dividendo.action";

@Injectable()
export class DividendoEffect {
  constructor(private dividendoService: DividendoService, private actions$: Actions) { }

  addDividendo$ = createEffect(() => this.actions$.pipe(
    ofType(addDividendo),
    mergeMap(({ dividendo }) => this.dividendoService.addDividendo(dividendo)
      .pipe(
        map((respuesta: ResponseInterface) => {
          return addDividendoSuccess({ msg: respuesta.msg, status: respuesta.status })
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));

  distributeDividendo$ = createEffect(() => this.actions$.pipe(
    ofType(distributeDividendo),
    mergeMap(({ distribuirDividendo }) => this.dividendoService.distribuirDividendo(distribuirDividendo)
      .pipe(
        map((respuesta: ResponseInterface) => {
          return distributeDividendoSuccess({ msg: respuesta.msg, status: respuesta.status })
        }),
        catchError((err: HttpErrorResponse) => [])
      )
    )
  ));
}
