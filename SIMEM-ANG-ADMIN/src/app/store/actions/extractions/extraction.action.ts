import { createAction, props } from '@ngrx/store';
import { ExtractionModel } from '../../model/extractions/extraction.model';

export const getExtractionInformation = createAction(
  'getExtractionInformation',
  props<{ idConfiguracionGeneracionArchivos: string }>()
);
export const getExtractionInformationSuccess = createAction(
  'getExtractionInformationSuccess',
  props<{ extractionInformation: ExtractionModel[] }>()
);
export const getExtractionInformationError = createAction('getExtractionInformationError');

export const saveExtractionInformation = createAction(
  'saveExtractionInformation',
  props<{ extractionInformation: ExtractionModel }>()
);

export const updateExtractionInformation = createAction(
  'updateExtractionInformation',
  props<{ extractionInformation: ExtractionModel }>()
);

export const deleteExtractionInformation = createAction(
  'deleteExtractionInformation',
  props<{ extractionInformation: ExtractionModel }>()
);

export const saveExtractionInformationError = createAction(
  'saveExtractionInformationError'
);