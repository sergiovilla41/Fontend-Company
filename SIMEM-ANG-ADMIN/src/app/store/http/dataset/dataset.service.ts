import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  BasicDataResponse,
  CategoryResponse,
  ClasificationRegulatoryResponse,
  DataSetResponse,
  DurationISOResponse,
  GranularityResponse,
  HasRecordResponse,
  LabelsResponse,
  PeriodicityResponse,
  TypeViewResponse,
} from '../../responses/datasets/datasets.interface';
import {
  BasicDataModel,
  CategoryModel,
  DataSetModel,
  HasRecordModel,
} from '../../model/dataset/datasets.model';
import { PropertiesList, SaveDataSet } from '../../interfaces/common-interface';

import _moment from 'moment';
const moment = _moment;

export const dataSetResponseToDataSetModel = (
  dataSetResponse: DataSetResponse
): DataSetModel => {
  return {
    idDataSet: dataSetResponse.idDataSet,
    idConfigurationFileGeneration:
      dataSetResponse.idConfiguracionGeneracionArchivos,
    title: dataSetResponse.titulo,
    theme: dataSetResponse.tema,
    fileNameDestination: dataSetResponse.nombreArchivoDestino,
    idGranularity: dataSetResponse.idGranularidad,
    nameGranularity: dataSetResponse.nombreGranularidad,
    idPeriodicity: dataSetResponse.idPeriodicidad,
    periodicity: dataSetResponse.periodicidad,
    nbSynapse: dataSetResponse.nbSynapse,
    initialDeltaValue: moment(dataSetResponse.valorDeltaInicial).toDate(),
    finalDeltaValue: moment(dataSetResponse.valorDeltaFinal).toDate(),
    idGenerationFileMaster: dataSetResponse.idGeneracionArchivoMaestra,
    generationFileMaster: dataSetResponse.generacionArchivoMaestra ?? '',
    state: dataSetResponse.estado,
    pipelineRunId: dataSetResponse.pipelineRunId,
  };
};

export const BasicDataResponseToBasicDataModel = (
  basicDataResponse: BasicDataResponse
): BasicDataModel => {
  return {
    ...basicDataResponse,
  };
};

export const duractionIsoResponseToPropertyList = (
  durationISOResponse: DurationISOResponse
): PropertiesList => {
  return {
    code: durationISOResponse.idDuracionISO,
    name: durationISOResponse.codigoISO8601,
    dataType: '',
    description: '',
  };
};

export const GranularityResponseToPropertyList = (
  granularityResponse: GranularityResponse
): PropertiesList => {
  return {
    code: granularityResponse.idGranularidad,
    name: granularityResponse.nombreGranularidad,
    dataType: '',
    description: '',
  };
};

export const PeriodicityResponseToPropertyList = (
  periodicityResponse: PeriodicityResponse
): PropertiesList => {
  return {
    code: periodicityResponse.idPeriodicidad,
    name: periodicityResponse.periodicidad,
    dataType: '',
    description: '',
  };
};

export const LabelsResponseToPropertyList = (
  labelsResponse: LabelsResponse
): PropertiesList => {
  return {
    code: labelsResponse.id,
    name: labelsResponse.titulo,
    dataType: '',
    description: '',
  };
};

export const ClasificationRegulatoryResponseToClasificationRegulatoryList = (
  clasificationResponse: ClasificationRegulatoryResponse
): PropertiesList => {
  return {
    code: clasificationResponse.idConfiguracionClasificacionRegulatoria,
    name: clasificationResponse.codigoDelta,
    dataType: '',
    description: '',
  };
};

export const TypeViewResponseToTypeViewModel = (
  typeViewResponse: TypeViewResponse
): PropertiesList => {
  return {
    code: typeViewResponse.idTipoVista,
    name: typeViewResponse.titulo,
    dataType: '',
    description: '',
  };
};

export const CategoryResponseToCategoryModel = (
  categoryResponse: CategoryResponse
): CategoryModel => {
  return {
    ...categoryResponse,
  };
};

export const HasRecordResponseToHasRecordRModel = (
  hasRecordResponse: HasRecordResponse
): HasRecordModel => {
  return {
    activeDataset: hasRecordResponse.hasRecords ? 'active' : 'inactive',
  };
};

@Injectable({
  providedIn: 'root',
})
export class DataSetService {
  constructor(private http: HttpClient) {}

  getDatasets(): Observable<DataSetResponse[]> {
    return this.http.get<DataSetResponse[]>(
      environment.SIMEM_ADMIN_URL + 'GeneracionArchivos/Records'
    );
  }

  getDurationISO(): Observable<DurationISOResponse[]> {
    return this.http.get<DurationISOResponse[]>(
      environment.SIMEM_ADMIN_URL +
        'GeneracionArchivos/SelectorDataByType?selectorType=DuracionISO'
    );
  }

  getGranularity(): Observable<GranularityResponse[]> {
    return this.http.get<GranularityResponse[]>(
      environment.SIMEM_ADMIN_URL +
        'GeneracionArchivos/SelectorDataByType?selectorType=Granularidad'
    );
  }

  getPeriodicity(): Observable<PeriodicityResponse[]> {
    return this.http.get<PeriodicityResponse[]>(
      environment.SIMEM_ADMIN_URL +
        'GeneracionArchivos/SelectorDataByType?selectorType=Periodicidad'
    );
  }

  getLabels(): Observable<LabelsResponse[]> {
    return this.http.get<LabelsResponse[]>(
      environment.SIMEM_ADMIN_URL +
        'GeneracionArchivos/SelectorDataByType?selectorType=Etiquetas'
    );
  }

  getCategory(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(
      environment.SIMEM_ADMIN_URL +
        'GeneracionArchivos/SelectorDataByType?selectorType=Categorias'
    );
  }

  getClasificationRegulatory(): Observable<ClasificationRegulatoryResponse[]> {
    return this.http.get<ClasificationRegulatoryResponse[]>(
      environment.SIMEM_ADMIN_URL +
        'GeneracionArchivos/SelectorDataByType?selectorType=Clasificacionregulatoria'
    );
  }

  getTypeView(): Observable<TypeViewResponse[]> {
    return this.http.get<TypeViewResponse[]>(
      environment.SIMEM_ADMIN_URL +
        'GeneracionArchivos/SelectorDataByType?selectorType=TipoVista'
    );
  }

  getDataSetBasicData(
    idConfigurationDataSet: string
  ): Observable<BasicDataResponse> {
    return this.http.get<BasicDataResponse>(
      environment.SIMEM_ADMIN_URL +
        `GeneracionArchivos/PreLoadBasicData?idConfiguracionGeneracionArchivos=${idConfigurationDataSet}`
    );
  }

  getHasRecord(idConfigurationDataSet: string): Observable<HasRecordResponse> {
    return this.http.get<HasRecordResponse>(
      environment.SIMEM_ADMIN_URL +
        `GeneracionArchivos/HasRecords?idgeneracionArchivos=${idConfigurationDataSet}`
    );
  }

  saveDataBasicDataSet(dataBasicDataSet: SaveDataSet): Observable<any> {
    let endPoint = `${
      environment.SIMEM_ADMIN_URL
    }${'GeneracionArchivos/Update'}`;
    return this.http.post<any>(endPoint, dataBasicDataSet);
  }

  executePipeline(nbSynapseName: string): Observable<string> {
    let endPoint = `${environment.SIMEM_ADMIN_URL}${'Synapse/Execute'}`;
    return this.http.post(endPoint, null, {
      params: { nbSynapseName },
      responseType: 'text',
    });
  }

  cancelExecutePipeline(pipelineRunid: string): Observable<string> {
    let endPoint = `${environment.SIMEM_ADMIN_URL}${'Synapse/Cancel'}`;
    return this.http.post(endPoint, null, {
      params: { pipelineRunid },
      responseType: 'text',
    });
  }
}
