import { createReducer, on } from "@ngrx/store";
import { SourceColumnsModel } from "../../model/dataset/datasets.model";
import { ExtractionPropertiesModel } from "../../model/extractions.model";
import { beforeSaving, getExtractionSourceColumnsSuccess, getPurposecolumnSuccess, getVersionColumnSuccess, saveExtractionColumnTargetVersionSuccess, saveSourceColumnsSuccess } from "../../actions/columns.action";

export interface ExtractionInitialState {
  purposeColumn: ExtractionPropertiesModel[];
  sourceColumns: SourceColumnsModel[];
  versionColumn: ExtractionPropertiesModel[];
  success: string;
}

export const initialState: ExtractionInitialState = {
  purposeColumn: [],
  sourceColumns: [],
  versionColumn: [],
  success: 'unsaved',
};

export const extractionsReducer = createReducer(
  initialState,
  on(getVersionColumnSuccess, (state, { versionColumn }) => ({
    ...state,
    versionColumn,
  })),
  on(getPurposecolumnSuccess, (state, { purposeColumn }) => ({
    ...state,
    purposeColumn,
  })),
  on(getExtractionSourceColumnsSuccess, (state, { sourceColumns }) => ({
    ...state,
    sourceColumns,
  })),
  on(saveSourceColumnsSuccess, (state, {}) => ({
    ...state,
    success: 'save',
  })),
  on(saveExtractionColumnTargetVersionSuccess, (state, {}) => ({
    ...state,
    success: 'save',
  })),
  on(beforeSaving, (state, {}) => ({
    ...state,
    success: 'unsaved',
    sourceColumns: []
  })),
);
