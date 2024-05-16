import { Category } from '../../responses/datasets/datasets.interface';

export interface DataSetModel {
  idDataSet: string;
  idConfigurationFileGeneration: string;
  title: string;
  theme: string;
  fileNameDestination: string;
  idGranularity: string;
  nameGranularity: string;
  idPeriodicity: string;
  periodicity: string;
  nbSynapse: string;
  initialDeltaValue: Date;
  finalDeltaValue: Date;
  idGenerationFileMaster?: string;
  generationFileMaster?: string;
  state?: boolean;
  pipelineRunId?: string;
}

export interface SourceColumnsModel {
  idSourceColumn: string;
  numeration: number;
  originColumn: string;
  idTargetColumn: string;
  targetColumn: string;
  dataType: string;
  description: string | null;
  idExtraction: string;
  idExtractionTargetColumn: string;
  idExtractionVersionColumn: string;
}

export interface CategoryModel {
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

export interface CategoryTreeNode {
  key: string;
  label: string;
  data: Data;
  expanded: boolean;
  children?: CategoryTreeNode[];
}

export interface Data {
  title: string;
  descripcion: string;
  id: string;
}

export interface BasicDataModel {
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

export interface HasRecordModel {
  activeDataset: string;
}

export interface ClasificationRegulatoryModel {
  idConfiguracionClasificacionRegulatoria: string;
  codigoDelta: string;
  descripcion: string;
}
