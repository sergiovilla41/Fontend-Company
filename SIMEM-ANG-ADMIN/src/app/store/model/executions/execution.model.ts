export interface ExecutionModel {
    idEjecucion: string,
    idConfiguracionGeneracionArchivos: string,
    dia: number | null,
    mes: number | null,
    hora: number,
    diaSemana: number | null,
    indDiaHabil: boolean,
    indActivo: boolean,
    fechaCreacion: Date,
    fechaActualizacion: Date | null,
}
