import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { TypesInterface } from "src/app/model/types.model";
import { TypesService } from "src/app/services/tablesTypes/types.service";
import { shareholderTypes, shareholderTypesError, shareholderTypesSuccess } from "../../actions/shareholderType.action";

@Injectable()
export class ShareholderTypeEffect {
    constructor(private typesService: TypesService, private actions$: Actions) { }

    shareholderTypes$ = createEffect(() => this.actions$.pipe(
        ofType(shareholderTypes),
        mergeMap(() => this.typesService.getShareholderType()
            .pipe(
                map((shareholdersTypesList: TypesInterface[]) =>{
                    return shareholderTypesSuccess({shareholdersTypesList: shareholdersTypesList})
                }),
                catchError((err: HttpErrorResponse)  => {
                    return [shareholderTypesError({ msg: err.error.msg, status: err.status })]
                })
            )
        )
    ));


}