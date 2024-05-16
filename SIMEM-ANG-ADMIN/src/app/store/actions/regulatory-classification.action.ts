import { createAction, props } from "@ngrx/store";
import { RegulatoryClassificationModel } from "../model/regulatory-classification.model";

export const getRegulatoryClassificationItems = createAction("getRegulatoryClassification")
export const getRegulatoryClassificationItemsSuccess = createAction("getRegulatoryClassificationSuccess", props<{regulatoryClassificationItems: RegulatoryClassificationModel[]}>())

export const updateRegulatoryClassificationItems = createAction("updateRegulatoryClassification", props<{dataRegulatoryClassification: RegulatoryClassificationModel}>())
export const updateRegulatoryClassificationItemsSuccess = createAction("updateRegulatoryClassificationSuccess", props<{saveRegulatoryClassification: RegulatoryClassificationModel}>())
export const updateRegulatoryClassificationItemsError = createAction("updateRegulatoryClassificationError")

export const addRegulatoryClassificationItems = createAction("addRegulatoryClassification", props<{dataRegulatoryClassification: RegulatoryClassificationModel}>())
export const addRegulatoryClassificationItemsSuccess = createAction("addRegulatoryClassificationSuccess", props<{saveRegulatoryClassification: RegulatoryClassificationModel}>())
export const addRegulatoryClassificationItemsError = createAction("addRegulatoryClassificationError")

export const beforeSavingClasification = createAction('beforeSaving');