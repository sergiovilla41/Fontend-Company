export interface Traslado {
  TRASLADO_UUID: string;
  ID: string,
  TIPO_ACCIONISTA_ANTERIOR: string;
  CONSECUTIVO_TITULO_ANTERIOR: string,
  IDENTIFICACION_ACCIONISTA_TITU_ANTERIOR: number,
  NOMBRE_ACCIONISTA_TITU_ANTERIOR: string,
  TIPO_ACCIONISTA_NUEVO: string,
  CONSECUTIVO_TITULO_NUEVO: string,
  IDENTIFICACION_ACCIONISTA_TITU_NUEVO: number,
  NOMBRE_ACCIONISTA_TITU_NUEVO: string,
  ACCIONES: number,
  TRASLADO_DIVIDENDO: number,
  OBSERVACION: string,
  FECHA_CREACION: string
  TITULO_ANTERIOR_UUID: string
  TITULO_NUEVO_UUID: string

}
