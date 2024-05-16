import { createAction, props } from "@ngrx/store";
import { TablaCargar } from "src/app/interfaces/shareholders.interface";
import { Asistencia, TypeAsistent } from "src/app/model/asistencia.model";

export const getAsistencias = createAction('get asistencias', props<{ ASAMBLEA_UUID: string, tablaCargar: TablaCargar }>())
export const getAsistenciasSuccess = createAction('get asistencias success', props<{ asistencias: Asistencia[], count: number }>())

export const getTypeAsistantList = createAction('get type asistant list')
export const getTypeAsistantListSuccess = createAction('get type asistant list success', props<{ typeAsistenciaList: TypeAsistent[] }>())

export const postAsistencia = createAction('post asistencia', props<{
  asistencia: {
    ASAMBLEA_UUID: string,
    ACCIONISTA_UUID: string,
    TIPO_ASISTENTE_UUID: string,
    NOMBRE_COMPLETO: string,
    TIPO_DOCUMENTO: string,
    IDENTIFICACION: number
  }
}>())

export const setStatusAsistencias = createAction('set status asistencias', props<{ msg: string, status: number }>())
export const cleanStatusAsistencias = createAction('clean status asistencias')

export const saveAsistencias = createAction('save asistencias', props<{ asistencias: Asistencia[] }>())

export const getDataCloseAssembly = createAction('getDataCloseAssembly', props<{ ASAMBLEA_UUID: string }>())
export const getDataCloseAssemblySuccess = createAction('getDataCloseAssemblySuccess', props<{data: {
  DESCRIPCION: string
}[]}>())
