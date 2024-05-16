import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, empty } from "rxjs";
import { environment } from "../../../../environments/environment";
import { ExecutionMonitoringModel } from "../../model/execution-monitoring.model";
import { ExtractionsModel } from "../../model/extractions.model";
import { ExecutionModel } from "../../model/execution.model";

interface ExecutionMonitoringResponse{
  idConfiguracionGeneracionArchivos : string,
  nombreConjuntoDeDatos? : string,
  nombreArchivoDestino? : string,
  estado? : string,
  fechaInicioEjecucion : string,
  fechaFinEjecucion? : string,
  esRegulatorio? : boolean,
  fechaProximaEjecucion? : string,
  lanzadoPor? : string,
  idEjecucion : string,
  pipelineRunId? : string,
  valorDeltaInicial : string,
  valorDeltaFinal? : string,
  clasificacionDeltas? : string,
  observaciones? : string,
  extracciones : ExtractionsModel[],
  ejecuciones : ExecutionModel[]
}

export const ExecutionMonitoringResponseToExecutionMonitoringModel = (a: ExecutionMonitoringResponse): ExecutionMonitoringModel =>{
  return {
    IdConfiguracionGeneracionArchivos : a.idConfiguracionGeneracionArchivos,
    NombreConjuntoDeDatos : a.nombreConjuntoDeDatos,
    NombreArchivoDestino : a.nombreArchivoDestino,
    Estado : a.estado,
    FechaInicioEjecucion : new Date(a.fechaInicioEjecucion),
    FechaFinEjecucion: (a.fechaFinEjecucion) ? new Date(a.fechaFinEjecucion) : undefined,
    EsRegulatorio : a.esRegulatorio,
    FechaProximaEjecucion : (a.fechaProximaEjecucion) ? new Date(a.fechaProximaEjecucion) : undefined,
    LanzadoPor : a.lanzadoPor,
    IdEjecucion : a.idEjecucion,
    PipelineRunId : a.pipelineRunId,
    ValorDeltaInicial : a.valorDeltaInicial,
    ValorDeltaFinal : a.valorDeltaFinal,
    ClasificacionDeltas : a.clasificacionDeltas,
    Observaciones : a.observaciones,
    Extracciones : a.extracciones,
    Ejecuciones : a.ejecuciones
  }
}


@Injectable({
  providedIn: 'root'
})
export class ExecutionMonitoringService{
  constructor(private http: HttpClient){}

  getExecutionMonitoring(): Observable<ExecutionMonitoringResponse[]>{
    return this.http.get<ExecutionMonitoringResponse[]>(environment.SIMEM_ADMIN_URL+'Monitoring/ExecutionAndError')
  }
}
