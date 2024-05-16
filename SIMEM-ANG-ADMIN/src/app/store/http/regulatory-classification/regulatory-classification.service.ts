import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegulatoryClassificationModel } from "../../model/regulatory-classification.model";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

export interface RegulatoryClassificationResponse {
  idConfiguracionClasificacionRegulatoria: string
    codigoDelta: string | null;
    descripcion: string | null;
    fechaCreacion: Date | null;
    deltaFinalAno: number | null;
    deltaFinalDiaMes: number | null;
    deltaFinalDiaSemana: number | null;
    deltaFinalDias: number | null;
    deltaFinalMes: number | null;
    deltaFinalMeses: number | null;
    deltaFinalPeriodo: string | null;
    deltaFinalSemanas: number | null;
    deltaInicialAno: number | null;
    deltaInicialDiaMes: number | null;
    deltaInicialDiaSemana: number | null;
    deltaInicialDias: number | null;
    deltaInicialMes: number | null;
    deltaInicialMeses: number | null;
    deltaInicialPeriodo: string | null;
    deltaInicialSemanas: number | null;
}

export const RegulatoryClassificationResponseToRegulatoryClassificationModel = (a: RegulatoryClassificationResponse): RegulatoryClassificationModel => {
  return {
    idConfiguracionClasificacionRegulatoria: a.idConfiguracionClasificacionRegulatoria,
    codigoDelta: a.codigoDelta,
    descripcion: a.descripcion,
    fechaCreacion: a.fechaCreacion,
    deltaFinalAno: a.deltaFinalAno,
    deltaFinalDiaMes: a.deltaFinalDiaMes,
    deltaFinalDiaSemana: a.deltaFinalDiaSemana,
    deltaFinalDias: a.deltaFinalDias,
    deltaFinalMes: a.deltaFinalMes,
    deltaFinalMeses: a.deltaFinalMeses,
    deltaFinalPeriodo: a.deltaFinalPeriodo,
    deltaFinalSemanas: a.deltaFinalSemanas,
    deltaInicialAno: a.deltaInicialAno,
    deltaInicialDiaMes: a.deltaInicialDiaMes,
    deltaInicialDiaSemana: a.deltaInicialDiaSemana,
    deltaInicialDias: a.deltaInicialDias,
    deltaInicialMes: a.deltaInicialMes,
    deltaInicialMeses: a.deltaInicialMeses,
    deltaInicialPeriodo: a.deltaInicialPeriodo,
    deltaInicialSemanas: a.deltaInicialSemanas
  }
}

@Injectable({
  providedIn: 'root'
})
export class RegulatoryClassificationService {
  constructor(private http: HttpClient) { }

  getRegulatoryClassification(): Observable<RegulatoryClassificationResponse[]> {
    return this.http.get<RegulatoryClassificationResponse[]>(environment.SIMEM_ADMIN_URL + 'RegulatoryClassify/Get')
  }

  updateRegulatoryClassification(dataRegulatoryClassification: RegulatoryClassificationResponse): Observable<any> {
    return this.http.put<any>(environment.SIMEM_ADMIN_URL + 'RegulatoryClassify/Update', dataRegulatoryClassification)
  }

  addRegulatoryClassification(dataRegulatoryClassification: RegulatoryClassificationResponse): Observable<any> {
    return this.http.post<any>(environment.SIMEM_ADMIN_URL + 'RegulatoryClassify/Create', dataRegulatoryClassification)
  }
}
