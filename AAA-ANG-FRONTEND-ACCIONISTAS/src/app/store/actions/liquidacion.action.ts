import { createAction, props } from "@ngrx/store";
import { TablaCargar } from "src/app/interfaces/shareholders.interface";
import { Liquidacion, LiquidacionEstado } from "src/app/model/liquidacion.model";

export const getLiquidacionList = createAction('get liquidacion list', props<{tablaCargar: TablaCargar, ASAMBLEA_UUID: string}>())
export const getLiquidacionListSuccess = createAction('get liquidacion list success', props<{liquidacionList: Liquidacion[], totalRows: number}>())

export const liquidarMasivamente = createAction('liquidar masivamente', props<{ASAMBLEA_UUID: string, TIPO_ACCIONISTA: number}>())
export const liquidarMasivamenteSuccess = createAction('liquidar masivamente success', props<{msg: string, status: number}>())

export const liquidarPorAccionista = createAction('liquidar por accionista', props<{TITULO_UUID: string, ASAMBLEA_UUID: string, CUOTAS: number}>())
export const liquidarPorAccionistaSuccess = createAction('liquidar por accionista success', props<{msg: string, status: number}>())

export const getLiquidacionEstados = createAction('get liquidacion estados')
export const getLiquidacionEstadosSuccess = createAction('get liquidacion estados success', props<{liquidacionEstados: LiquidacionEstado[]}>())

export const actualizarLiquidacion = createAction('actualizar liquidacion', props<{ID_REGISTRO: string, ESTADO_UUID: string}>())

export const anularLiquidacion = createAction('anular liquidación', props<{PARAMETRIZACION_UUID: string, ESTADO_UUID: string}>())

export const cleanLiquidacionState = createAction('clean liquidacion state')
