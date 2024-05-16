import { createAction, props } from "@ngrx/store";
import { EmpresaDominio } from "../model/EmpresaDominio";
import { User } from "../model/User.model";

export const getUserList = createAction("getUserList")
export const getUserListSuccess = createAction("getUserListSuccess", props<{userList: User[]}>())

export const getCompanyDomain = createAction("get company domain")
export const getCompanyDomainSccess = createAction("get company domain success", props<{empresaDominioList: EmpresaDominio[]}>())

export const createUser = createAction("create user", props<{user: User}>())
export const createUserSuccess = createAction("create user success")

export const editUser = createAction("edit user", props<{user: User}>())
export const editUserSuccess = createAction("edit user success")

export const clearUserState = createAction("clear user state")
