import { createReducer, on } from '@ngrx/store';
import { ExtractionModel } from '../../model/extractions/extraction.model';
import { getExtractionInformationSuccess } from '../../actions/extractions/extraction.action';

export interface ExtractionInformationState {
  extractionInformation: ExtractionModel[];
  extractionDataState: string;
}

export const extractionInformationState: ExtractionInformationState = {
  extractionInformation: [],
  extractionDataState: 'OK',
};

export const extractionReducer = createReducer(
  extractionInformationState,
  on(getExtractionInformationSuccess, (state, { extractionInformation }) => {
    return { ...state, extractionInformation, extractionDataState: 'OK' };
  })
);
