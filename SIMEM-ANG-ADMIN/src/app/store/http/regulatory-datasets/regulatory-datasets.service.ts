import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { RegulatoryDatasetsModel } from "../../model/regulatory-datasets.model";

interface RegulatoryDatasetsResponse{
    id: string,
    nombre: string,
    maximaFechaRegulatoria: Date,
    fechaProximaEjecucion: Date,
    deltaInicialEjecutar: Date,
    deltaFinalEjecutar: Date,
    diasHabilesFaltantes: number,
    estado: string
}

export const RegulatoryDatasetsResponseToRegulatoryDatasetsModel = (a: RegulatoryDatasetsResponse): RegulatoryDatasetsModel =>{
  return {
    id: a.id,
    nombre: a.nombre,
    maximaFechaRegulatoria: a.maximaFechaRegulatoria,
    fechaProximaEjecucion: a?.fechaProximaEjecucion,
    deltaInicialEjecutar: a.deltaInicialEjecutar,
    deltaFinalEjecutar: a.deltaFinalEjecutar,
    diasHabilesFaltantes: a.diasHabilesFaltantes,
    estado: a.estado
  }
}


@Injectable({
  providedIn: 'root'
})
export class RegulatoryDatasetsService{
  constructor(private http: HttpClient){}

  getRegulatoryDatasets(): Observable<RegulatoryDatasetsResponse[]>{
    return this.http.get<RegulatoryDatasetsResponse[]>(environment.SIMEM_ADMIN_URL+'DataSets/Regulatory')
  }
}
