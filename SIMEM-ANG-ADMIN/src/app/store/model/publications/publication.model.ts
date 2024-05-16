export interface PublicationModel {
    idPublicacionRegulatoria: string,
    idConfiguracionGeneracionArchivos: string,
    dia: number | null,
    mes: number | null,
    diaSemana: number | null,
    indDiaHabil: boolean | null,
    fechaCreacion: Date | null,
}
