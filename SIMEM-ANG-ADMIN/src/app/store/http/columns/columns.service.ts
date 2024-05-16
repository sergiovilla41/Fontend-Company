import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ExecutionInformationModel } from '../../model/executionInformation.model';
import { SourceColumnsModel } from '../../model/dataset/datasets.model';
import { SourceColumnsSave } from '../../interfaces/datasets-source-columns.interface';
import { ExtractionPropertiesModel } from '../../model/extractions.model';

export interface ExecutionInformationResponse {
  idConfiguracionEjecucion: string;
  idExtraccion: number;
  dia: number | null;
  mes: number | null;
  diaSemana: number | null;
  hora: number | null;
  indDiaHabil: boolean | null;
  indRegulatorio: boolean | null;
  indActivo: boolean | null;
  fechaCreacion: Date | null;
  fechaActualizacion: Date | null;
}

export const executionResponseToExecutionModel = (
  ex: ExecutionInformationResponse
): ExecutionInformationModel => {
  return {
    ...ex,
  };
};

export interface SourceColumnsResponse {
  idColumnaOrigen: string;
  numeracion: number;
  columnaOrigen: string;
  idColumnaDestino: string;
  nombreColumnaDestino: string;
  tipoDato: string;
  descripcion: string | null;
  idExtraccion: string;
  extraccionIdColumnaDestino: string;
  extraccionColumnaVersion: string;
}

export const sourceColumnsResponseToSourceColumnsModel = (
  columnsSource: SourceColumnsResponse
): SourceColumnsModel => {
  return {
    idSourceColumn: columnsSource.idColumnaOrigen,
    numeration: columnsSource.numeracion,
    originColumn: columnsSource.columnaOrigen,
    idTargetColumn: columnsSource.idColumnaDestino,
    targetColumn: columnsSource.nombreColumnaDestino,
    dataType: columnsSource.tipoDato,
    description:
      columnsSource.descripcion === null ? '' : columnsSource.descripcion,
    idExtraction: columnsSource.idExtraccion,
    idExtractionTargetColumn: columnsSource.extraccionIdColumnaDestino,
    idExtractionVersionColumn: columnsSource.extraccionColumnaVersion,
  };
};

export interface PropertiesResponse {
  idDestinationColumn: number;
  idRegulatoryClassification: number;
  id: string | null;
  value: string;
  tipoDato: string;
  descripcion: string;
}

export const propertiesResponseToPropertiesModel = (
  prop: PropertiesResponse
): ExtractionPropertiesModel => {
  return {
    idDestinationColumn: prop.idDestinationColumn,
    idRegulatoryClassification: prop.idRegulatoryClassification,
    id: prop.id === null ? '' : prop.id,
    value: prop.value,
    dataType: prop.tipoDato === null ? '' : prop.tipoDato,
    description: prop.descripcion === null ? '' : prop.descripcion,
  };
};

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  constructor(private http: HttpClient) {}

  getExecutionByIdExtraction(
    idExtraction: string
  ): Observable<ExecutionInformationResponse[]> {
    return this.http.get<ExecutionInformationResponse[]>(
      `${
        environment.SIMEM_ADMIN_URL
      }${'OriginColumns/ByIdExtraccion?idExtraccion='}${idExtraction}`
    );
  }

  getSourceColumns(idExtraction: string): Observable<SourceColumnsResponse[]> {
    let endPoint = `${
      environment.SIMEM_ADMIN_URL
    }${'OriginColumns/ByIdExtraccion?idExtraccion='}${idExtraction}`;
    return this.http.get<SourceColumnsResponse[]>(endPoint);
  }

  saveSourceColumns(sourceColumn: SourceColumnsSave): Observable<any> {
    let endPoint = `${environment.SIMEM_ADMIN_URL}${'OriginColumns/Update'}`;
    return this.http.post<any>(endPoint, sourceColumn);
  }

  getProperties(typeProperty: string): Observable<PropertiesResponse[]> {
    let endPoint = `${
      environment.SIMEM_ADMIN_URL
    }${'GeneracionArchivos/SelectProperties?type='}${typeProperty}`;
    return this.http.get<PropertiesResponse[]>(endPoint);
  }

  saveExtractionColumnTargetVersion(
    sourceColumn: SourceColumnsSave
  ): Observable<any> {
    let endPoint = `${
      environment.SIMEM_ADMIN_URL
    }${'GeneracionArchivos/UpdateColumns'}`;
    return this.http.post<any>(endPoint, sourceColumn);
  }
}
