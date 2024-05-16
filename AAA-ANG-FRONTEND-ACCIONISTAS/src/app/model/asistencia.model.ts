export interface Asistencia {
  isPresent: boolean,
  TIPO_ASISTENTE: string,
  NOMBRE_COMPLETO: string,
  TIPO_DOCUMENTO: string,
  IDENTIFICACION: number,
  ASISTENTE_UUID: string,
  ASAMBLEA_UUID: string,
  ACCIONISTA: string,
  NOMBRE_COMPLETO_ASISTENTE: string,
  PORCENTAJE_PARTICIPACION: string,
  TOTAL_ACCIONES: number,
  ACTIVO: number
}

export interface TypeAsistent {
  ID_REGISTRO: string,
  DESCRIPCION: string
}
