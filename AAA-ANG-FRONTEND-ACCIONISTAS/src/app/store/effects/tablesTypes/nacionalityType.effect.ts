import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { TypesInterface } from "src/app/model/types.model";
import { TypesService } from "src/app/services/tablesTypes/types.service";
import { nacionalityType, nacionalityTypeError, nacionalityTypeSuccess } from "../../actions/nacionalityType.action";


@Injectable()
export class NacionalityTypeEffect {
    constructor(private typesService: TypesService, private actions$: Actions) { }

    nacionalityType$ = createEffect(() => this.actions$.pipe(
        ofType(nacionalityType),
        mergeMap(() => this.typesService.getNacionalityType()
            .pipe(
                map((nacionalityTypeList: TypesInterface[]) =>{
                    return nacionalityTypeSuccess({nacionalityTypeList: nacionalityTypeList})
                }),
                catchError((err: HttpErrorResponse)  => {
                    return [nacionalityTypeError({ msg: err.error.msg, status: err.status })]
                })
            )
        )
    ));


}