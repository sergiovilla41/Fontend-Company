export interface Liquidacion {
  ACCIONES: number
  CONSECUTIVO: string
  CUOTA: number
  DIVIDENDO: number
  ESTADO: string
  IDENTIFICACION: number
  ID_REGISTRO: string
  NOMBRE: string
  TIPO_ACCIONISTA: string
  VALOR_CUOTA: number
  VALOR_FACTURADO: number
  VALOR_NETO: number
}

export interface LiquidacionEstado {
  ID_REGISTRO: string,
  DESCRIPCION: string
}

