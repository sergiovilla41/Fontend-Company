import { createSelector } from "@ngrx/store";
import { State } from "src/app/model/state.model";
import { VotacionState } from "../../reducers/votacion/votacion.reducer";

export const selectVotacionState = (state: State) => state.votacion


export const selectVotacionTypes = (state: State) => state.votacion.votacionTypes
export const selectVotacionList = (state: State) => state.votacion.votacionList
export const selectVotacionCount = (state: State) => state.votacion.count
export const selectRespuestasList = (state: State) => state.votacion.respuestas
export const selectRespuestasListActives = (state: State) => state.votacion.respuestas?.filter(el => el.ESTADO === 1)
export const selectEstadisticasVotacion = (state: State) => state.votacion.estadisticas
export const selectPlanchas = (state: State) => state.votacion.planchas

export const selectVotacion = createSelector(
  selectVotacionState,
  (state: VotacionState) => state.votacionTypes
)
