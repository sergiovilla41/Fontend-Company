import { createReducer, on } from '@ngrx/store';
import {
  beforeHasRecord,
  beforeSaving,
  errorApi,
  getBasicDatasetSuccess,
  getCategoriesSuccess,
  getDatasetsSuccess,
  getDurationISOSuccess,
  getGranularitySuccess,
  getHasRecordSuccess,
  getLabelsSuccess,
  getPeriodicitySuccess,
  getTypeViewsuccess,
  saveDataBasicDataSetSuccess,
} from '../../actions/dataset/dataset.action';
import {
  BasicDataModel,
  CategoryModel,
  DataSetModel,
  HasRecordModel,
} from '../../model/dataset/datasets.model';
import { PropertiesList } from '../../interfaces/common-interface';
import { getClasificationRegulatorysuccess } from '../../actions/dataset/dataset.action';

export interface DataSetInitialState {
  dataSetsItems: DataSetModel[];
  basicDataDataSet: BasicDataModel;
  categoriesItems: CategoryModel[];
  durationISOItems: PropertiesList[];
  granularityItems: PropertiesList[];
  periodicityItems: PropertiesList[];
  lablesItems: PropertiesList[];
  typeViewItems: PropertiesList[];
  success: string;
  hasRecord: HasRecordModel;
  clasificationRegulatory: PropertiesList[];
}

export const initialState: DataSetInitialState = {
  dataSetsItems: [],
  categoriesItems: [],
  durationISOItems: [],
  granularityItems: [],
  periodicityItems: [],
  lablesItems: [],
  basicDataDataSet: {
    idConfiguracionGeneracionArchivos: '',
    tema: '',
    nombreArchivoDestino: '',
    datoObligatorio: false,
    indRegulatorio: false,
    selectXM: '',
    nbSynapse: '',
    idDuracionISO: '',
    valorDeltaInicial: '',
    valorDeltaFinal: '',
    ultimaFechaActualizado: '',
    idPeriodicidad: '',
    titulo: '',
    descripcion: '',
    privacidad: false,
    idCategoria: '',
    idTipoVista: '',
    idGranularidad: '',
    entidadOrigen: '',
    estado: false,
    idConfiguracionClasificacionRegulatoria: '',
    etiquetas: [],
    nombreCategoria: '',
  },
  success: 'unsaved',
  hasRecord: {
    activeDataset: 'unactive',
  },
  clasificationRegulatory: [],
  typeViewItems: [],
};

export const dataSetsReducer = createReducer(
  initialState,
  on(getDatasetsSuccess, (state, { dataSetsItems }) => {
    return { ...state, dataSetsItems };
  }),
  on(getBasicDatasetSuccess, (state, { basicDataDataSet }) => {
    return { ...state, basicDataDataSet };
  }),
  on(getCategoriesSuccess, (state, { categoriesItems }) => {
    return { ...state, categoriesItems };
  }),
  on(getDurationISOSuccess, (state, { durationISOItems }) => {
    return { ...state, durationISOItems };
  }),
  on(getGranularitySuccess, (state, { granularityItems }) => {
    return { ...state, granularityItems };
  }),
  on(getPeriodicitySuccess, (state, { periodicityItems }) => {
    return { ...state, periodicityItems };
  }),
  on(getLabelsSuccess, (state, { lablesItems }) => {
    return { ...state, lablesItems };
  }),
  on(
    getClasificationRegulatorysuccess,
    (state, { clasificationRegulatory }) => {
      return { ...state, clasificationRegulatory };
    }
  ),
  on(getTypeViewsuccess, (state, { typeViewItems }) => {
    return { ...state, typeViewItems };
  }),
  on(beforeSaving, (state) => ({
    ...state,
    success: 'unsaved',
  })),
  on(saveDataBasicDataSetSuccess, (state) => ({
    ...state,
    success: 'save',
  })),
  on(errorApi, (state) => ({
    ...state,
    success: 'error',
  })),
  on(beforeHasRecord, (state) => ({
    ...state,
    hasRecord: {
      activeDataset: 'unactive',
    },
  })),
  on(getHasRecordSuccess, (state, { hasRecord }) => ({
    ...state,
    hasRecord,
  }))
);
