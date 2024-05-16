import { ExecutionModel } from "./execution.model";
import { ExtractionsModel } from "./extractions.model";

export interface ExecutionMonitoringModel{
  IdConfiguracionGeneracionArchivos: string,
  NombreConjuntoDeDatos? : string,
  NombreArchivoDestino? : string,
  Estado? : string,
  FechaInicioEjecucion : Date,
  FechaFinEjecucion? : Date,
  EsRegulatorio? : boolean,
  FechaProximaEjecucion? : Date,
  LanzadoPor? : string,
  IdEjecucion : string, 
  PipelineRunId? : string,  
  ValorDeltaInicial : string,  
  ValorDeltaFinal? : string,
  ClasificacionDeltas? : string,  
  Observaciones? : string,
  Extracciones : ExtractionsModel[],
  Ejecuciones : ExecutionModel[]
}