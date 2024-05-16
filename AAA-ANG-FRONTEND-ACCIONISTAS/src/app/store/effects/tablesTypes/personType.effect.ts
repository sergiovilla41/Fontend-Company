import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { TypesInterface } from "src/app/model/types.model";
import { TypesService } from "src/app/services/tablesTypes/types.service";
import { personTypes, personTypesError, personTypesSuccess } from "../../actions/personType.action";

@Injectable()
export class PersonTypeEffect {
    constructor(private typesService: TypesService, private actions$: Actions) { }

    personTypes$ = createEffect(() => this.actions$.pipe(
        ofType(personTypes),
        mergeMap(() => this.typesService.getPersonType()
            .pipe(
                map((personTypesList: TypesInterface[]) =>{
                    return personTypesSuccess({personTypesList: personTypesList})
                }),
                catchError((err: HttpErrorResponse)  => {
                    return [personTypesError({ msg: err.error.msg, status: err.status })]
                })
            )
        )
    ));


}