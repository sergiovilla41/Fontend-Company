import { createAction, props } from "@ngrx/store";
import { TablaCargar } from "src/app/interfaces/shareholders.interface";
import { EstadisticasVotacion, NuevaPregunta, OpcionRespuesta, Plancha, SaveAsistenteRespuesta, Votacion, VotacionType } from "src/app/model/votacion.model";

export const getVotacionTypes = createAction('get votacion types')
export const getVotacionTypesSuccess = createAction('get votacion types success', props<{votacionTypes: VotacionType[]}>())

export const getVotacionList = createAction('get votacion list', props<{tablaCargar: TablaCargar, ASAMBLEA_UUID: string}>())
export const getVotacionListSuccess = createAction('get votacion list success', props<{rows: Votacion[], count: number}>())

export const postPregunta = createAction('post pregunta', props<{nuevaPregunta: NuevaPregunta}>())
export const editarPregunta = createAction('editar pregunta', props<{nuevaPregunta: NuevaPregunta}>())
export const actionSuccess = createAction('action success', props<{status: number, msg: string}>())

export const clearStateVotacion = createAction('clear state votacion')

export const getOpcionRespuestaList = createAction('get opcion respuesta list', props<{VOTACION_UUID: string}>())
export const getOpcionRespuestaListSuccess = createAction('get opcion respuesta list success', props<{rows: OpcionRespuesta[]}>())

export const getCandidateQuestionPlate = createAction('getCandidateQuestionPlate', props<{VOTACION_UUID: string}>())
export const getCandidateQuestionPlateSuccess = createAction('getCandidateQuestionPlate success', props<{rows: Plancha[]}>())

export const agregarRespuesta = createAction('agregar respuesta', props<{respuesta: string}>())

export const saveRespuestas = createAction('save respuestas', props<{respuestas: OpcionRespuesta[]}>());

export const createCandidatePresidentBallot = createAction('createCandidatePresidentBallot', props<{planchas: {respuesta: string, tipo?: string, personas?: {name: string}[]}[], VOTACION_UUID: string}>())

export const saveAsistentesRespuestas = createAction('save asistentes respuestas', props<{saveAsistenteRespuestas: SaveAsistenteRespuesta[], asambleaUUID: string}>())

export const cerrarVotacion = createAction('cerrar votacion', props<{votacionUUID: string, asambleaUUID: string}>())

export const getEstadisticasVotacion = createAction('get estadisticas votacion', props<{asambleaUUID: string}>())
export const getEstadisticasVotacionSuccess = createAction('get estadisticas votacion success', props<{estadisticas: EstadisticasVotacion}>())
