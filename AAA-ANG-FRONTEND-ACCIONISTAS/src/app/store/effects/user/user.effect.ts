import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  UpdateUser,
  UpdateUserError,
  UpdateUserSuccess,
  deletUserError,
  deletUserSuccess,
  deleteUser,
  exportCsvUsers,
  exportCsvUsersError,
  exportCsvUsersSuccess,
  exportExcelUsers,
  exportExcelUsersError,
  exportExcelUsersSuccess,
  exportPdfUsers,
  exportPdfUsersError,
  exportPdfUsersSuccess,
  newUser,
  newUserError,
  newUserSuccess,
  validateUser,
  validateUserError,
  validateUserSuccess,
} from "../../actions/user.action";
import { catchError, map, mergeMap } from "rxjs";

import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseInterface } from "src/app/model/response.model";
import { UserService } from "src/app/services/user/user.service";

@Injectable()
export class UserEffect {
  constructor(private userService: UserService, private actions$: Actions) {}

  validateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(validateUser),
      mergeMap(({ user }) =>
        this.userService.validateUser(user).pipe(
          map((isUser: any) => {
            return validateUserSuccess({ isUser: true, dataLogin: isUser });
          }),
          catchError((err: HttpErrorResponse) => {
            return [validateUserError({ text: err.error, status: err.status })];
          })
        )
      )
    )
  );

  newUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newUser),
      mergeMap(({ user }) =>
        this.userService.newUser(user).pipe(
          map((respuesta: ResponseInterface) => {
            return newUserSuccess({
              msg: respuesta.msg,
              status: respuesta.status,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            return [newUserError({ msg: err.error, status: err.status })];
          })
        )
      )
    )
  );

  UpdateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateUser),
      mergeMap(({ user }) =>
        this.userService.updateUser(user).pipe(
          map((respuesta: ResponseInterface) => {
            return UpdateUserSuccess({
              msg: respuesta.msg,
              status: respuesta.status,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            
            return [UpdateUserError({ msg: err.error, status: err.status })];
          })
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      mergeMap(({ user }) =>
        this.userService.deleteUser(user).pipe(
          map((respuesta: ResponseInterface) => {
            return deletUserSuccess({
              msg: respuesta.msg,
              status: respuesta.status,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            return [deletUserError({ msg: err.error, status: err.status })];
          })
        )
      )
    )
  );

  exportExcelUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exportExcelUsers),
      mergeMap(() =>
        this.userService.exportExcelUsers().pipe(
          map((respuesta: ResponseInterface) => {
            return exportExcelUsersSuccess({ payload: respuesta });
          }),
          catchError((err: HttpErrorResponse) => {
            return [
              exportExcelUsersError({ msg: err.error, status: err.status }),
            ];
          })
        )
      )
    )
  );

  exportCsvUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exportCsvUsers),
      mergeMap(() =>
        this.userService.exportCsvUsers().pipe(
          map((respuesta: ResponseInterface) => {
            return exportCsvUsersSuccess({ payload: respuesta });
          }),
          catchError((err: HttpErrorResponse) => {
            return [
              exportCsvUsersError({ msg: err.error, status: err.status }),
            ];
          })
        )
      )
    )
  );

  exportPdfUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exportPdfUsers),
      mergeMap(() =>
        this.userService.exportPdfUsers().pipe(
          map((respuesta: ResponseInterface) => {
            return exportPdfUsersSuccess({ payload: respuesta });
          }),
          catchError((err: HttpErrorResponse) => {
            return [
              exportPdfUsersError({ msg: err.error, status: err.status }),
            ];
          })
        )
      )
    )
  );
}
