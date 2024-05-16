import { State } from "src/app/model/state.model";

export const selectLiquidacionList = (state: State) => state.liquidacion.liquidacionList
export const selectTotalRows = (state: State) => state.liquidacion.totalRows
export const selectLiquidacionEstados = (state: State) => state.liquidacion.liquidacionEstados
