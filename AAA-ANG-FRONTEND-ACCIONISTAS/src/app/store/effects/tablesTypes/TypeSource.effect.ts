import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { TypesInterface } from "src/app/model/types.model";
import { TypesService } from "src/app/services/tablesTypes/types.service";
import { TypeSource, TypeSourceError, TypeSourceSuccess } from "../../actions/TypeSource.action";

@Injectable()
export class TypeSourceEffect {
    constructor(private typesService: TypesService, private actions$: Actions) { }

    TypeSource$ = createEffect(() => this.actions$.pipe(
        ofType(TypeSource),
        mergeMap(() => this.typesService.getTypeSource()
            .pipe(
                map((typeSourceList: TypesInterface[]) =>{
                    return TypeSourceSuccess({typeSourceList: typeSourceList})
                }),
                catchError((err: HttpErrorResponse)  => {
                    return [TypeSourceError({ msg: err.error.msg, status: err.status })]
                })
            )
        )
    ));


}