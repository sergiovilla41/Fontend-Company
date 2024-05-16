import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { TypesInterface } from "src/app/model/types.model";
import { TypesService } from "src/app/services/tablesTypes/types.service";
import { typeOfFiler, typeOfFilerError, typeOfFilerSuccess } from "../../actions/typeOfFiler.action";

@Injectable()
export class TypeOfFilerEffect {
    constructor(private typesService: TypesService, private actions$: Actions) { }

    typeOfFiler$ = createEffect(() => this.actions$.pipe(
        ofType(typeOfFiler),
        mergeMap(() => this.typesService.gettypeOfFiler()
            .pipe(
                map((typeOfFilerList: TypesInterface[]) =>{
                    return typeOfFilerSuccess({typeOfFilerList: typeOfFilerList})
                }),
                catchError((err: HttpErrorResponse)  => {
                    return [typeOfFilerError({ msg: err.error.msg, status: err.status })]
                })
            )
        )
    ));


}