import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { TypesInterface } from "src/app/model/types.model";
import { TypesService } from "src/app/services/tablesTypes/types.service";
import { accountType, accountTypeError, accountTypeSuccess } from "../../actions/accountType.action";


@Injectable()
export class AccountTypeEffect {
    constructor(private typesService: TypesService, private actions$: Actions) { }

    accountType$ = createEffect(() => this.actions$.pipe(
        ofType(accountType),
        mergeMap(() => this.typesService.getAccountType()
            .pipe(
                map((accountTypeList: TypesInterface[]) =>{
                    return accountTypeSuccess({accountTypeList: accountTypeList})
                }),
                catchError((err: HttpErrorResponse)  => {
                    return [accountTypeError({ msg: err.error.msg, status: err.status })]
                })
            )
        )
    ));


}