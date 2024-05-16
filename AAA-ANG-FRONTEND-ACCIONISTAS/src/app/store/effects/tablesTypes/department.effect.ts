import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { countryCitiesInterface } from "src/app/model/countryCities.model";
import { TypesService } from "src/app/services/tablesTypes/types.service";
import { department, departmentError, departmentSuccess } from "../../actions/department.action";


@Injectable()
export class DepartmentEffect {
    constructor(private typesService: TypesService, private actions$: Actions) { }

    departmentCity$ = createEffect(() => this.actions$.pipe(
        ofType(department),
        mergeMap(({country}) => this.typesService.getDepartment(country)
            .pipe(
                map((department: countryCitiesInterface[]) =>{
                    return departmentSuccess({department: department})
                }),
                catchError((err: HttpErrorResponse)  => {
                    return [departmentError({ msg: err.error.msg, status: err.status })]
                })
            )
        )
    ));


}