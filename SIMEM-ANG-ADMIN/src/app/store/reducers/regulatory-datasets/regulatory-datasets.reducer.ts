import { createReducer, on } from "@ngrx/store";
import { RegulatoryDatasetsModel } from "../../model/regulatory-datasets.model";
import { getRegulatoryDatasetsItemsSuccess } from "../../actions/regulatory-datasets.action";

export interface RegulatoryDatasetsInitialState{
  regulatoryDatasetsItems: RegulatoryDatasetsModel[]
}

export const regulatoryDatasetsInitialState: RegulatoryDatasetsInitialState = {
  regulatoryDatasetsItems: []
}

export const regulatoryDatasetsReducer = createReducer(
  regulatoryDatasetsInitialState,
  on(getRegulatoryDatasetsItemsSuccess, (state, {regulatoryDatasetsItems}) => {
    return ({...state, regulatoryDatasetsItems})
  })
)
