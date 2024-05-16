export interface ExecutionModel {
    IdEjecucion: string,
    IdConfiguracionGeneracionArchivos: string,
    Dia?: number,
    Mes?: number,
    Hora: number,
    DiaSemana?: number,
    IndDiaHabil: boolean,
    IndActivo: boolean,
    FechaCreacion: Date,
    FechaActualizacion: Date
}
  