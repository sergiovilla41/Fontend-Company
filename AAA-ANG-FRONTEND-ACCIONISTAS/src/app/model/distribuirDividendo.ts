export interface Distribucion{
  ASAMBLEA_UUID: string,
  TIPO_ACCIONISTA_UUID: string,
  CUOTAS: 1,
  OBSERVACION: string
}

export interface DistribuirDividendo {
  DATA: Distribucion[]
}
