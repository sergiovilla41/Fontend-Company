import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { forgotPassword, forgotPasswordError, forgotPasswordSuccess } from "../../actions/forgotPassword.action";
import { forgotPasswordService } from "src/app/services/forgotpassword/forgotPassword.service"
import { ResponseInterface } from "src/app/model/response.model";


@Injectable()
export class forgotPasswordEffect {
    constructor(private forgotpasswordService: forgotPasswordService, private actions$: Actions) { }
    forgotPassword$ = createEffect(() => this.actions$.pipe(
        ofType(forgotPassword),
        mergeMap(({email}) => this.forgotpasswordService.forgotPassword(email)
            .pipe(
                map((respuesta: ResponseInterface) =>{
                    
                    return forgotPasswordSuccess({msg: respuesta.msg, status: respuesta.status})
                }),
                catchError((err: HttpErrorResponse)  => {
                    
                    
                    return [forgotPasswordError({ msg: err.error.errors.email.msg, value: err.error.errors.email.value, param: err.error.errors.email.param, status: err.status })]
                })
            )
        )
    ));
}