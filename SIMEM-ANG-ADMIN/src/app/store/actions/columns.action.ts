import { createAction, props } from '@ngrx/store';
import { ExecutionInformationModel } from '../model/executionInformation.model';
import { SourceColumnsModel } from '../model/dataset/datasets.model';
import { SourceColumnsSave } from '../interfaces/datasets-source-columns.interface';
import { ExtractionPropertiesModel } from '../model/extractions.model';

export const getExecutionInformation = createAction(
  'getExecutionInformation',
  props<{ idExtraction: string }>()
);
export const getExecutionInformationSuccess = createAction(
  'getExecutionInformationSuccess',
  props<{ executionInformation: ExecutionInformationModel[] }>()
);
export const getExecutionInformationError = createAction(
  'getExecutionInformationError'
);

export const getExtractionSourceColumns = createAction(
  'getExtractionSourceColumns',
  props<{ idExtraction: string }>()
);
export const getExtractionSourceColumnsSuccess = createAction(
  'getExtractionSourceColumnsSuccess',
  props<{ sourceColumns: SourceColumnsModel[] }>()
);
export const getExtractionSourceColumnsError = createAction(
  'getExtractionSourceColumnsError'
);

export const saveSourceColumns = createAction(
  'saveSourceColumns',
  props<{ sourceColumns: SourceColumnsSave }>()
);
export const saveSourceColumnsSuccess = createAction(
  'saveSourceColumnsSuccess',
  props<{ sourceColumnsResult: any }>()
);

export const getVersionColumn = createAction(
  'getVersionColumn',
  props<{ typeProperty: string }>()
);
export const getVersionColumnSuccess = createAction(
  'getVersionColumnSuccess',
  props<{ versionColumn: ExtractionPropertiesModel[] }>()
);
export const getVersionColumnError = createAction('getVersionColumnError');

export const getPurposeColumn = createAction(
  'getPurposecolumn',
  props<{ typeProperty: string }>()
);
export const getPurposecolumnSuccess = createAction(
  'getPurposecolumnSuccess',
  props<{ purposeColumn: ExtractionPropertiesModel[] }>()
);
export const getPurposecolumnError = createAction('getPurposecolumnError');

export const saveExtractionColumnTargetVersion = createAction(
  'saveExtractionColumnTargetVersion',
  props<{ sourceColumns: SourceColumnsSave }>()
);
export const saveExtractionColumnTargetVersionSuccess = createAction(
  'saveExtractionColumnTargetVersionSuccess',
  props<{ sourceColumnsResult: any }>()
);

export const errorApi = createAction('errorApi');
export const beforeSaving = createAction('beforeSaving');
