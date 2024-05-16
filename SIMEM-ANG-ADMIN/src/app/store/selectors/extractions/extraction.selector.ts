import { State } from '../../model/state.model';

export const selectExtractionItems = (state: State) =>
  state.extractionInformation.extractionInformation;

export const selectExtractionState = (state: State) =>
  state.extractionInformation.extractionDataState;
