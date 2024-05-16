export interface Votacion {
  id: string,
  TIPO_VOTACION: string,
  TIPO_VOTACION_UUID: string
  DESCRIPCION: string,
  FECHA_CREACION: Date,
  ESTADO: string;
  VOTACION_UUID: string
}

export interface VotacionResult {
  nombre: string;
  apoderado: string;
  identificacion: number;
  respuesta: Respuesta
}

export enum Respuesta {
  si = 0,
  no,
  meAbstengo,
  enContra,
  enBlanco,
  Paso
}

export interface OpcionRespuesta {
  ESTADO: number;
  ID_REGISTRO: string;
  NOMBRE_COMPLETO: string;
}

export interface VotacionType {
  ID_REGISTRO?: string,
  DESCRIPCION?: string
}

export interface NuevaPregunta {
  VOTACION_UUID?: string;
  TIPO_VOTACION_UUID: string,
  ASAMBLEA_UUID: string,
  ES_VISIBLE: number,
  DESCRIPCION: string,
}

export interface EstadisticasVotacion {
  TOTAL_ASISTENTES: number,
  ACCIONES_CIRCULACION: string,
  TOTAL_ACCIONES: number,
  POR_PARTICIPACION: number,
  PORCENTAJE_VOTACION: number
}

export interface SaveAsistenteRespuesta {
  VOTACION_UUID: string,
  ASISTENTE_UUID: string,
  CANDIDATO_UUID: string
}

export interface Plancha{
  plancha: string
}
