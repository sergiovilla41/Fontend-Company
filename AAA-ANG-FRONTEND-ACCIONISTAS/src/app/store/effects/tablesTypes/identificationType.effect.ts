import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { TypesInterface } from "src/app/model/types.model";
import { TypesService } from "src/app/services/tablesTypes/types.service";
import { identificationType, identificationTypeError, identificationTypeSuccess } from "../../actions/identificationType.action";

@Injectable()
export class identificationTypeEffect {
    constructor(private typesService: TypesService, private actions$: Actions) { }

    identificationType$ = createEffect(() => this.actions$.pipe(
        ofType(identificationType),
        mergeMap(() => this.typesService.getIdentificationType()
            .pipe(
                map((identificationTypeList: TypesInterface[]) =>{
                    return identificationTypeSuccess({identificationTypeList: identificationTypeList})
                }),
                catchError((err: HttpErrorResponse)  => {
                    return [identificationTypeError({ msg: err.error.msg, status: err.status })]
                })
            )
        )
    ));


}