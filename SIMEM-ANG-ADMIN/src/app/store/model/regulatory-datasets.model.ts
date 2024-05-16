export interface RegulatoryDatasetsModel{
    id: string,
    nombre: string,
    maximaFechaRegulatoria?: Date,
    fechaProximaEjecucion?: Date,
    deltaInicialEjecutar: Date,
    deltaFinalEjecutar: Date,
    diasHabilesFaltantes: number,
    estado: string
  }
  