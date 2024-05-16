import { createReducer, on } from "@ngrx/store";
import { Label } from "../../model/labels.model";
import { clearLabelState, createLabelSuccess, getLabelsSuccess, updateLabelSuccess } from "../../actions/labels.action";

export interface LabelState {
  labels: Label[],
  createdState: boolean,
  updatedState: boolean
}

export const labelInitialState: LabelState = {
  labels: [],
  createdState: false,
  updatedState: false
}

export const labelReducer = createReducer(
  labelInitialState,
  on(getLabelsSuccess, (state, {labels}) => ({...state, labels})),
  on(createLabelSuccess, (state) => ({...state, createdState: true})),
  on(updateLabelSuccess, (state) => ({...state, updatedState: true})),
  on(clearLabelState, (state) => ({...state, createdState: false, updatedState: false}))
)
