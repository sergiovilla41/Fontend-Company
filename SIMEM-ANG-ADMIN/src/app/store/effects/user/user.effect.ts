import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map } from "rxjs";
import { UserService } from "../../http/user/user.service";
import { createUser, createUserSuccess, editUser, editUserSuccess, getCompanyDomain, getCompanyDomainSccess, getUserList, getUserListSuccess } from "../../actions/user.action";
import { Store } from "@ngrx/store";
import { State } from "../../model/state.model";

@Injectable()
export class UserEffect {
  constructor(private actions$: Actions, private service: UserService, private store: Store<State>) { }

  getExecutionInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserList),
      exhaustMap(() =>
        this.service.getUserList().pipe(
          map((userList) => {
            return getUserListSuccess({
              userList: userList.map(a => ({
                ...a,
                fechaIniUsuario: a.fechaIniUsuario ? new Date(a.fechaIniUsuario) : a.fechaIniUsuario,
                fechaFinUsuario: a.fechaFinUsuario ? new Date(a.fechaFinUsuario) : a.fechaFinUsuario
              }))
            });
          })
        )
      )
    )
  );

  getEmpresaDominio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCompanyDomain),
      exhaustMap(() =>
        this.service.getEmpresDominio().pipe(
          map((empresaDominioList) => {
            return getCompanyDomainSccess({ empresaDominioList });
          })
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      exhaustMap(({ user }) =>
        this.service.createUser(user).pipe(
          map(() => {
            this.store.dispatch(createUserSuccess())
            return getUserList();
          })
        )
      )
    )
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editUser),
      exhaustMap(({ user }) =>
        this.service.editUser(user).pipe(
          map(() => {
            this.store.dispatch(editUserSuccess())
            return getUserList();
          })
        )
      )
    )
  );
}
