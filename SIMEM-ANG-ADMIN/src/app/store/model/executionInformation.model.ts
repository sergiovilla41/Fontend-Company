export interface ExecutionInformationModel {
  idConfiguracionEjecucion: string;
  idExtraccion: number;
  dia: number | null;
  mes: number | null;
  diaSemana: number | null;
  hora: number | null;
  indRegulatorio: boolean | null;
  indDiaHabil: boolean | null;
  indActivo: boolean | null;
  fechaCreacion: Date | null;
  fechaActualizacion: Date | null;
}
