import { createReducer, on } from "@ngrx/store";
import { initialState } from "../traslado/traslado.reducer";
import { addDividendoSuccess, cleanStateDividendo, distributeDividendo, distributeDividendoSuccess } from "../../actions/dividendo.action";

export interface DividendoState{
  msg?: string
  status?: number
}

export const dividendoInitialState: DividendoState = {}

export const dividendoReducer = createReducer(
  initialState,
  on(addDividendoSuccess, (state, {msg, status}) => ({...state, msg, status})),
  on(cleanStateDividendo, (state) => ({...state, msg: undefined, status: undefined})),
  on(distributeDividendoSuccess, (state, {msg, status}) => ({...state, msg, status})),
)
