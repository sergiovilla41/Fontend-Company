import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { UsersList } from "src/app/model/usersList.model";
import { UserService } from "src/app/services/user/user.service";
import { validateUsersList, validateUsersListError, validateUsersListSuccess } from "../../actions/usersList.action";

@Injectable()
export class UsersListEffect {
    constructor(private userService: UserService, private actions$: Actions) { }

    validateUserList$ = createEffect(() => this.actions$.pipe(
        ofType(validateUsersList),
        mergeMap(() => this.userService.getUsersList()
            .pipe(
                map((usersList: UsersList[]) =>{
                    return validateUsersListSuccess({dataUserList: usersList})
                }),
                catchError((err: HttpErrorResponse)  => {
                    return [validateUsersListError({ text: err.error, status: err.status })]
                })
            )
        )
    ));
}