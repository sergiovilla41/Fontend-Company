import { createReducer, on } from "@ngrx/store";
import { User } from "../../model/User.model";
import { EmpresaDominio } from "../../model/EmpresaDominio";
import { getCompanyDomainSccess, getUserListSuccess, editUserSuccess, createUserSuccess, clearUserState } from "../../actions/user.action";

export interface UserState {
  userList: User[]
  empresaDominioList: EmpresaDominio[],
  createdUser: boolean,
  updatedUser: boolean
}

export const initialUserState: UserState = {
  empresaDominioList: [],
  userList: [],
  createdUser: false,
  updatedUser: false
}

export const UserReducer = createReducer(
  initialUserState,
  on(getCompanyDomainSccess, (state, { empresaDominioList }) => ({ ...state, empresaDominioList })),
  on(getUserListSuccess, (state, { userList }) => ({ ...state, userList })),
  on(createUserSuccess, (state) => ({ ...state, createdUser: true })),
  on(editUserSuccess, (state) => ({ ...state, updatedUser: true })),
  on(clearUserState, (state) => ({ ...state, createdUser: false, updatedUser: false }))
)
