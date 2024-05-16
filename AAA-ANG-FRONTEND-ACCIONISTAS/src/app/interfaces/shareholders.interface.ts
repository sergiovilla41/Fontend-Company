export interface TablaCargar {
  first: number,
  rows: number,
  orderCampo?: string,
  tipoOrder?: TipoOrder,
  filtro?: Filtro[]
}

export enum TipoOrder {
  DESC = 'DESC',
  ASC = 'ASC'
}

export interface Filtro {
  columna: string,
  valor: string
}
