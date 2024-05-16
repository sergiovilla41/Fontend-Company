import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SecurityService } from "../../http/security/security.service";
import { validateUser, validateUserError, validateUserSuccess } from "../../actions/security.action";
import { catchError, exhaustMap, map } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

export const validateUserEffect = createEffect(
  (actions$ = inject(Actions), service$ = inject(SecurityService)) => actions$.pipe(
    ofType(validateUser),
    exhaustMap(({ user }) => service$.validateUser(user).pipe(
      map((response) => validateUserSuccess({isAllowed: true, token: response.token, companies: response.empresas})),
      catchError((error: HttpErrorResponse) => [validateUserError({userState: error.error["message"]})])
    ))
  ),
  { functional: true, dispatch: true }
)
