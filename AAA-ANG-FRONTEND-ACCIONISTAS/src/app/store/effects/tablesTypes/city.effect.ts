import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { countryCitiesInterface } from "src/app/model/countryCities.model";
import { TypesService } from "src/app/services/tablesTypes/types.service";
import { cities, citiesError, citiesSuccess } from "../../actions/city.action";


@Injectable()
export class CityEffect {
    constructor(private typesService: TypesService, private actions$: Actions) { }

    cities$ = createEffect(() => this.actions$.pipe(
        ofType(cities),
        mergeMap(({countryDepartment}) => this.typesService.getCity(countryDepartment)
            .pipe(
                map((city: countryCitiesInterface[]) =>{
                    return citiesSuccess({city: city})
                }),
                catchError((err: HttpErrorResponse)  => {
                    return [citiesError({ msg: err.error.msg, status: err.status })]
                })
            )
        )
    ));


}