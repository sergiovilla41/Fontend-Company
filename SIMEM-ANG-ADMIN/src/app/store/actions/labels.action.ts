import { createAction, props } from "@ngrx/store";
import { Label } from "../model/labels.model";

export const getLabels = createAction("get labels")
export const getLabelsSuccess = createAction("get labels success", props<{labels: Label[]}>())

export const updateLabel = createAction("updateLabel", props<{label: Label}>())
export const updateLabelSuccess = createAction("update label success")

export const createLabel = createAction("createLabel", props<{label: Label}>())
export const createLabelSuccess = createAction("create label success")

export const clearLabelState = createAction("clear label success")
