import { State } from "../../model/state.model";

export const selectIsAllowedUser = (state: State) => ({isAllowed: state.security.isAllowed, userState: state.security.userState})
export const selectEmpresas = (state: State) => state.security.companies
