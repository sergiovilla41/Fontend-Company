import { createReducer, on } from "@ngrx/store";
import { User } from "../../model/User.model";
import { validateUserError, validateUserSuccess } from "../../actions/security.action";
import { Empresa } from "../../model/empresa.model";

export interface SecurityState {
  activeUser?: User,
  isAllowed?: boolean,
  companies?: Empresa[],
  userState?: string,
  token?: string
}

export let securityInitialState: SecurityState = {}

if(localStorage.getItem("state")) securityInitialState = JSON.parse(localStorage.getItem("state") ?? "")


export const securityReducer = createReducer(
  securityInitialState,
  on(validateUserSuccess, (state, { isAllowed, companies, token }) => {
    if(token) localStorage.setItem("state", JSON.stringify({ ...state, isAllowed, companies, token }))
    return ({ ...state, isAllowed, companies, token })
  }),
  on(validateUserError, (state, { userState }) => ({ ...state, userState, isAllowed: false }))
)
