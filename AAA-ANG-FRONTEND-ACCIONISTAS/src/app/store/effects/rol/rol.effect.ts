import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { userRol, userRolError, userRolSuccess } from "../../actions/rol.action";

import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RolInterface } from "src/app/model/rol.model";
import { RolService } from "src/app/services/rol/rol.service";
import { newUserError } from "../../actions/user.action";

@Injectable()
export class RolEffect {
    constructor(private rolService: RolService, private actions$: Actions) { }

    userRol$ = createEffect(() => this.actions$.pipe(
        ofType(userRol),
        mergeMap(() => this.rolService.getRol()
            .pipe(
                map((rolList: RolInterface[]) =>{
                    return userRolSuccess({rolList: rolList})
                }),
                catchError((err: HttpErrorResponse)  => {
                    return [userRolError({ msg: err.error.msg, status: err.status })]
                })
            )
        )
    ));


}
