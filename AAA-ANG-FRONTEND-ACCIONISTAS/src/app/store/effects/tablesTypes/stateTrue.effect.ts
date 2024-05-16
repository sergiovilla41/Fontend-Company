import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { TypesInterface } from "src/app/model/types.model";
import { TypesService } from "src/app/services/tablesTypes/types.service";
import { bank, bankError, bankSuccess } from "../../actions/bank.action";
import { stateTrue, stateTrueError, stateTrueSuccess } from "../../actions/state.action";


@Injectable()
export class StateEffect {
    constructor(private typesService: TypesService, private actions$: Actions) { }

    stateTrue$ = createEffect(() => this.actions$.pipe(
        ofType(stateTrue),
        mergeMap(() => this.typesService.getStateTrue()
            .pipe(
                map((stateTrue: TypesInterface[]) =>{
                    return stateTrueSuccess({stateTrue: stateTrue})
                }),
                catchError((err: HttpErrorResponse)  => {
                    return [stateTrueError({ msg: err.error.msg, status: err.status })]
                })
            )
        )
    ));


}