import { createSelector } from "@ngrx/store";
import { State } from "src/app/model/state.model";
import { AsistenciaState } from "../../reducers/asistencias/asistencias.reducer";

export const selectVotacionState = (state: State) => state.asistencia

export const selectAsistencias = (state: State) => state.asistencia.asistencias
export const selectAsistenciasActives = (state: State) => state.asistencia.asistencias?.filter(el => el.ACTIVO === 1)
export const selectAsistenciaTypes = (state: State) => state.asistencia.typeAsistenciaList
export const selectTotalAsistencias = (state: State) => state.asistencia.count
export const selectData = (state: State) => state.asistencia.data


export const selectAsistencia = createSelector(
  selectVotacionState,
  (state: AsistenciaState) => state.asistencias
)
