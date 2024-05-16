import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { TypesInterface } from "src/app/model/types.model";
import { TypesService } from "src/app/services/tablesTypes/types.service";
import { bank, bankError, bankSuccess } from "../../actions/bank.action";


@Injectable()
export class BanckEffect {
    constructor(private typesService: TypesService, private actions$: Actions) { }

    bank$ = createEffect(() => this.actions$.pipe(
        ofType(bank),
        mergeMap(() => this.typesService.getBank()
            .pipe(
                map((bankList: TypesInterface[]) =>{
                    return bankSuccess({bankList: bankList})
                }),
                catchError((err: HttpErrorResponse)  => {
                    return [bankError({ msg: err.error.msg, status: err.status })]
                })
            )
        )
    ));


}