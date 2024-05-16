import { createReducer, on } from "@ngrx/store";
import { initialState } from "../traslado/traslado.reducer";
import { actionSuccess, clearStateVotacion, getCandidateQuestionPlateSuccess, getEstadisticasVotacionSuccess, getOpcionRespuestaListSuccess, getVotacionListSuccess, getVotacionTypesSuccess } from "../../actions/votacion.action";
import { EstadisticasVotacion, OpcionRespuesta, Plancha, Votacion, VotacionType } from "src/app/model/votacion.model";

export interface VotacionState {
  votacionTypes: VotacionType[],
  votacionList: Votacion[],
  count: number,
  status?: number,
  msg?: string,
  respuestas: OpcionRespuesta[],
  estadisticas?: EstadisticasVotacion,
  planchas: Plancha[]
}

export const votacionInitialState: VotacionState = {
  votacionTypes: [],
  votacionList: [],
  count: 0,
  respuestas: [],
  planchas: []
}

export const votacionReducer = createReducer(
  initialState,
  on(getVotacionTypesSuccess, (state, {votacionTypes}) => ({...state, votacionTypes})),
  on(getVotacionListSuccess, (state, {count, rows}) => ({...state, votacionList: rows, count})),
  on(clearStateVotacion, (state) => ({...state, status: undefined, msg: undefined})),
  on(actionSuccess, (state, {msg, status}) => ({...state, msg, status})),
  on(getOpcionRespuestaListSuccess, (state, {rows}) => ({...state, respuestas: rows})),
  on(getEstadisticasVotacionSuccess, (state, {estadisticas}) => ({...state, estadisticas})),
  on(getCandidateQuestionPlateSuccess, (state, {rows})=>({...state, planchas: rows}))
)
