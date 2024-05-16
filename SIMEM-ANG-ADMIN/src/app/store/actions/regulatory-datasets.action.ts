import { createAction, props } from "@ngrx/store";
import { RegulatoryDatasetsModel } from "../model/regulatory-datasets.model";

export const getRegulatoryDatasetsItems = createAction("getRegulatoryDatasets")
export const getRegulatoryDatasetsItemsSuccess = createAction("getRegulatoryDatasetsSuccess", props<{regulatoryDatasetsItems: RegulatoryDatasetsModel[]}>())
export const getRegulatoryDatasetsItemsError = createAction("getRegulatoryDatasetsError")
