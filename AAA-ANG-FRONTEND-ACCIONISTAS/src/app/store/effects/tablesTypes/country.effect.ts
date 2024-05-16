import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { countryCitiesInterface } from "src/app/model/countryCities.model";
import { TypesInterface } from "src/app/model/types.model";
import { TypesService } from "src/app/services/tablesTypes/types.service";
import { country, countryError, countrySuccess } from "../../actions/country.action";
import { stateTrue, stateTrueError, stateTrueSuccess } from "../../actions/state.action";


@Injectable()
export class CountryEffect {
    constructor(private typesService: TypesService, private actions$: Actions) { }

    country$ = createEffect(() => this.actions$.pipe(
        ofType(country),
        mergeMap(() => this.typesService.getCountry()
            .pipe(
                map((country: countryCitiesInterface[]) =>{
                    return countrySuccess({country: country})
                }),
                catchError((err: HttpErrorResponse)  => {
                    return [countryError({ msg: err.error.msg, status: err.status })]
                })
            )
        )
    ));


}