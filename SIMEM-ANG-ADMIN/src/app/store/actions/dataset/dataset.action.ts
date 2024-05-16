import { createAction, props } from '@ngrx/store';
import {
  BasicDataModel,
  CategoryModel,
  DataSetModel,
  HasRecordModel,
} from '../../model/dataset/datasets.model';
import { PropertiesList, SaveDataSet } from '../../interfaces/common-interface';

export const getDatasets = createAction('getDatasets');
export const getDatasetsSuccess = createAction(
  'getDatasetsSuccess',
  props<{ dataSetsItems: DataSetModel[] }>()
);
export const dataSetsError = createAction('dataSetsError');

export const getBasicDataset = createAction(
  'getBasicDataset',
  props<{ idConfigurationDataSet: string }>()
);
export const getBasicDatasetSuccess = createAction(
  'getBasicDatasetSuccess',
  props<{ basicDataDataSet: BasicDataModel }>()
);
export const basicDatasetError = createAction('basicDatasetError');

export const getCategories = createAction('getCategories');
export const getCategoriesSuccess = createAction(
  'getCategoriesSuccess',
  props<{ categoriesItems: CategoryModel[] }>()
);
export const categoriesError = createAction('categoriesError');

export const getDurationISO = createAction('getDurationISO');
export const getDurationISOSuccess = createAction(
  'getDurationISOSuccess',
  props<{ durationISOItems: PropertiesList[] }>()
);
export const durationISOError = createAction('durationISOError');

export const getGranularity = createAction('getGranularity');
export const getGranularitySuccess = createAction(
  'getGranularitySuccess',
  props<{ granularityItems: PropertiesList[] }>()
);
export const getGranularityError = createAction('getGranularityError');

export const getPeriodicity = createAction('getPeriodicity');
export const getPeriodicitySuccess = createAction(
  'getPeriodicitySuccess',
  props<{ periodicityItems: PropertiesList[] }>()
);
export const getPeriodicityError = createAction('getPeriodicityError');

export const getLabels = createAction('getLabels');
export const getLabelsSuccess = createAction(
  'getLabelsSuccess',
  props<{ lablesItems: PropertiesList[] }>()
);
export const getLabelsError = createAction('getLabelsError');

export const beforeSaving = createAction('beforeSaving');
export const beforeHasRecord = createAction('beforeHasRecord');

export const saveDataBasicDataSet = createAction(
  'saveDataBasicDataSet',
  props<{ dataBasicDataSet: SaveDataSet }>()
);

export const saveDataBasicDataSetSuccess = createAction(
  'saveDataBasicDataSetSuccess',
  props<{ saveDataBasicDataSet: any }>()
);

export const errorApi = createAction('errorApi');

export const getHasRecord = createAction(
  'getHasRecord',
  props<{ idConfigurationDataSet: string }>()
);
export const getHasRecordSuccess = createAction(
  'getHasRecordSuccess',
  props<{ hasRecord: HasRecordModel }>()
);
export const getHasRecordError = createAction('getHasRecordError');

export const getClasificationRegulatory = createAction(
  'getClasificationRegulatory'
);
export const getClasificationRegulatorysuccess = createAction(
  'getClasificationRegulatorysuccess',
  props<{ clasificationRegulatory: PropertiesList[] }>()
);
export const getClasificationRegulatoryError = createAction(
  'getClasificationRegulatoryError'
);

export const getTypeView = createAction('getTypeView');
export const getTypeViewsuccess = createAction(
  'getTypeViewsuccess',
  props<{ typeViewItems: PropertiesList[] }>()
);
export const getTypeViewError = createAction('getTypeViewError');

export const executePipeline = createAction(
  'executePipeline',
  props<{ nbSynapseName: string }>()
);

export const cancelExecutePipeline = createAction(
  'cancelExecutePipeline',
  props<{ pipelineRunid: string }>()
);
