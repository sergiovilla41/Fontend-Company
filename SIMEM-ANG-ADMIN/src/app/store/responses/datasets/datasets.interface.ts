import { DataSetModel } from '../../model/dataset/datasets.model';

export interface DataSetResponse {
  idDataSet: string;
  idConfiguracionGeneracionArchivos: string;
  titulo: string;
  tema: string;
  nombreArchivoDestino: string;
  idGranularidad: string;
  nombreGranularidad: string;
  idPeriodicidad: string;
  periodicidad: string;
  nbSynapse: string;
  valorDeltaInicial: string;
  valorDeltaFinal: string;
  idGeneracionArchivoMaestra?: string;
  generacionArchivoMaestra?: string;
  estado: boolean;
  fail?: string;
  pipelineRunId?: string;
}

export interface LabelsResponse {
  id: string;
  titulo: string;
  estado: boolean;
}

export interface PeriodicityResponse {
  idPeriodicidad: string;
  periodicidad: string;
  ordenPeriodicidad: number;
  fechaCreacion: Date;
}

export interface GranularityResponse {
  idGranularidad: string;
  nombreGranularidad: string;
  descripcion: string;
  fechaCreacion: Date;
}

export interface DurationISOResponse {
  idDuracionISO: string;
  codigoISO8601: string;
  descripcion: string;
  fechaCreacion: Date;
}

export interface CategoryResponse {
  id: string;
  idCategoria: string;
  titulo: string;
  icono: string;
  estado: string;
  descripcion: string;
  ordenCategoria: number;
  privado: boolean;
  cantidadConjuntoDato: number;
  cantidadDescarga: number;
  children: Category[];
}

export interface Category {
  id: string;
  idCategoria: string;
  titulo: string;
  icono: string;
  estado: string;
  descripcion: string;
  ordenCategoria: number;
  privado: boolean;
  cantidadConjuntoDato: number;
  cantidadDescarga: number;
  children: Category[];
}

export interface BasicDataResponse {
  idConfiguracionGeneracionArchivos: string;
  tema: string;
  nombreArchivoDestino: string;
  datoObligatorio: boolean;
  indRegulatorio: boolean;
  selectXM: string;
  nbSynapse: string;
  idDuracionISO: string;
  valorDeltaInicial: string;
  valorDeltaFinal: string;
  ultimaFechaIndexado?: string;
  ultimaFechaActualizado: string;
  idPeriodicidad: string;
  titulo: string;
  descripcion: string;
  privacidad: boolean;
  idCategoria: string;
  idTipoVista: string;
  idGranularidad: string;
  entidadOrigen: string;
  estado: boolean;
  idConfiguracionClasificacionRegulatoria: string;
  etiquetas: string[];
  nombreCategoria: string;
}

export interface HasRecordResponse {
  hasRecords: boolean;
}

export interface ClasificationRegulatoryResponse {
  idConfiguracionClasificacionRegulatoria: string;
  codigoDelta: string;
  descripcion: string;
}

export interface TypeViewResponse {
  idTipoVista: string;
  titulo: string;
  estado: boolean;
}
