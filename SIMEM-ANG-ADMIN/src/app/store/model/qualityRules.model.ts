export interface QualityRulesModel {
  idCalidad: number,
  idExtraccion: number,
  columnas: string,
  granularidadCalidad: string,
  numeroReglaActualidad: number,
  idCriterioCalidadDatos?: number,
  idSolucion: number,
  descripcion?: string
}
