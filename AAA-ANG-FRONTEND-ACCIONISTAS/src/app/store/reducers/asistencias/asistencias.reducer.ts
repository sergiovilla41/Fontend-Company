import { createReducer, on } from "@ngrx/store";
import { Asistencia, TypeAsistent } from "src/app/model/asistencia.model";
import { initialState } from "../traslado/traslado.reducer";
import { cleanStatusAsistencias, getAsistenciasSuccess, getDataCloseAssemblySuccess, getTypeAsistantListSuccess, setStatusAsistencias } from "../../actions/asistencias.action";

export interface AsistenciaState {
  asistencias: Asistencia[],
  count: number,
  typeAsistenciaList: TypeAsistent[],
  msg?: string,
  status?: number,
  data?: {
    DESCRIPCION: string
  }[]
}

export const asistenciaInitialState: AsistenciaState = {
  asistencias: [],
  typeAsistenciaList: [],
  count: 0
}

export const asistenciaReducer = createReducer(
  initialState,
  on(getAsistenciasSuccess, (state, { asistencias, count }) => ({ ...state, asistencias, count })),
  on(getTypeAsistantListSuccess, (state, { typeAsistenciaList }) => ({ ...state, typeAsistenciaList })),
  on(setStatusAsistencias, (state, { msg, status }) => ({ ...state, msg, status })),
  on(cleanStatusAsistencias, (state) => ({ ...state, msg: undefined, status: undefined })),
  on(getDataCloseAssemblySuccess, (state, { data }) => ({ ...state, data }))
)
