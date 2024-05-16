export interface ExtractionModel {
    idExtraccion: string,
    idConfiguracionGeneracionArchivos: string,
    proyecto?: string,
    tema?: string,
    nombreExtraccion: string,
    periodicidad?: string,
    intervaloPeriodicidad?: number,
    fechaDeltaInicial?: Date,
    fechaDeltaFinal?: Date,
    fechaCreacion: Date
}
