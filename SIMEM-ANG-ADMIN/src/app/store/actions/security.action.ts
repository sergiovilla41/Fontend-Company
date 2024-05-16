import { createAction, props } from "@ngrx/store";
import { User } from "../model/User.model";
import { Empresa } from "../model/empresa.model";

export const validateUser = createAction("validate user", props<{ user: User }>())
export const validateUserSuccess = createAction("validate user success", props<{
  isAllowed?: boolean,
  token?: string,
  companies?: Empresa[]
}>())
export const validateUserError = createAction("validate user error", props<{userState: string}>())
