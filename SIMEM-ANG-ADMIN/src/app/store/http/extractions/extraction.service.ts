import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ExtractionModel } from '../../model/extractions/extraction.model';
import _moment from 'moment';
const moment = _moment;

export interface ExtractionResponse {
  idExtraccion: string;
  idConfiguracionGeneracionArchivos: string;
  proyecto: string;
  tema: string;
  nombreExtraccion: string;
  periodicidad?: string;
  intervaloPeriodicidad?: number;
  fechaDeltaInicial?: Date;
  fechaDeltaFinal?: Date;
  fechaCreacion: Date;
}

export const extractionResponseToExtractionModel = (ex: ExtractionResponse): ExtractionModel => {
  return {
    idExtraccion: ex.idExtraccion,
    idConfiguracionGeneracionArchivos: ex.idConfiguracionGeneracionArchivos,
    proyecto: ex.proyecto,
    tema: ex.tema,
    nombreExtraccion: ex.nombreExtraccion,
    periodicidad: ex.periodicidad,
    intervaloPeriodicidad: ex.intervaloPeriodicidad,
    fechaDeltaInicial: moment(ex?.fechaDeltaInicial).toDate(),
    fechaDeltaFinal: moment(ex?.fechaDeltaFinal).toDate(),
    fechaCreacion: ex.fechaCreacion
  };
};

@Injectable({
  providedIn: 'root',
})
export class ExtractionService {
  constructor(private http: HttpClient) {}

  getExtractions(idConfiguracionGeneracionArchivos: string): Observable<ExtractionResponse[]> {
    let endPoint = `${environment.SIMEM_ADMIN_URL}${'Extraction/Records?idDataset='}${idConfiguracionGeneracionArchivos}`;
    return this.http.get<ExtractionResponse[]>(endPoint);
  }

  saveExtraction(extraction: ExtractionModel) {
    let endPoint = `${environment.SIMEM_ADMIN_URL}${'Extraction/Add'}`;
    return this.http.post(endPoint, extraction, {responseType: 'text'});
  }

  updateExtraction(extraction: ExtractionModel) {
    let endPoint = `${environment.SIMEM_ADMIN_URL}${'Extraction/UpdateExtraction'}`;
    return this.http.put(endPoint, extraction, {responseType: 'text'});
  }

  deleteExtraction(idExtraccion: string) {
    let endPoint = `${environment.SIMEM_ADMIN_URL}${'Extraction/Remove?idExtraccion='}${idExtraccion}`;
    return this.http.delete(endPoint, {responseType: 'text'});
  }
}
