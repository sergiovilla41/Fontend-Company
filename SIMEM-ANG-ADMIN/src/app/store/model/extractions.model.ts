export interface ExtractionsModel {
    IdExtraccion: string,
    IdConfiguracionGeneracionArchivos: string,
    Proyecto: string,
    Tema: string,
    NombreExtraccion: string,
    SecretoKeyVaultOrigenLakeXM?: string,
    SecretoKeyVaultOrigenDBXM?: string,
    Periodicidad?: string,
    IntervaloPeriodicidad?: number,
    FechaDeltaInicial?: string,
    FechaDeltaFinal?: string,
    FechaCreacion: string,
    FechaActualizacion?: string
}

export interface ExtractionPropertiesModel {
  idDestinationColumn: number;
  idRegulatoryClassification: number;
  id: string | null;
  value: string;
  dataType: string;
  description: string;
}
