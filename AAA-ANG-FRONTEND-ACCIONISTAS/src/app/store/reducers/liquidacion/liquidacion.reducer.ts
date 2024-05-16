import { createReducer, on } from "@ngrx/store";
import { initialState } from "../traslado/traslado.reducer";
import { Liquidacion, LiquidacionEstado } from "src/app/model/liquidacion.model";
import { cleanLiquidacionState, getLiquidacionEstadosSuccess, getLiquidacionListSuccess, liquidarMasivamenteSuccess, liquidarPorAccionistaSuccess } from "../../actions/liquidacion.action";

export interface LiquidacionState{
  liquidacionList: Liquidacion[],
  totalRows: number,
  status?: number,
  msg?: string,
  liquidacionEstados: LiquidacionEstado[]
}

export const liquidacionInitialState: LiquidacionState = {
  liquidacionList: [],
  totalRows: 0,
  liquidacionEstados: []
}

export const liquidacionReducer = createReducer(
  initialState,
  on(getLiquidacionListSuccess, (state, {liquidacionList, totalRows})=>({...state, liquidacionList, totalRows})),
  on(cleanLiquidacionState, (state) => ({...state, status: undefined, msg: undefined})),
  on(liquidarMasivamenteSuccess, (state, {msg, status}) => ({...state, msg, status})),
  on(liquidarPorAccionistaSuccess, (state, {msg, status}) => ({...state, msg, status})),
  on(getLiquidacionEstadosSuccess, (state, {liquidacionEstados}) => ({...state, liquidacionEstados}))
)
