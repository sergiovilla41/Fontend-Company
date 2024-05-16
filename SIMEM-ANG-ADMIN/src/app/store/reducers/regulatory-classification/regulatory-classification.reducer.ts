import { createReducer, on } from "@ngrx/store";
import { RegulatoryClassificationModel } from "../../model/regulatory-classification.model";
import { addRegulatoryClassificationItems, addRegulatoryClassificationItemsSuccess, beforeSavingClasification, getRegulatoryClassificationItemsSuccess, updateRegulatoryClassificationItems, updateRegulatoryClassificationItemsSuccess } from "../../actions/regulatory-classification.action";

export interface RegulatoryClassificationInitialState{
  regulatoryClassificationItems: RegulatoryClassificationModel[],
  success: string,
}

export const clasificacionRegulatoriaInitialState: RegulatoryClassificationInitialState = {
  regulatoryClassificationItems: [],
  success: 'unsaved',
}

export const regulatoryClassificationReducer = createReducer(
  clasificacionRegulatoriaInitialState,
  on(getRegulatoryClassificationItemsSuccess, (state, {regulatoryClassificationItems})=>
    ({...state, regulatoryClassificationItems})
  ),
  on(updateRegulatoryClassificationItemsSuccess, (state, {}) => {
    return ({...state, success: 'save'})
  }),
  on(addRegulatoryClassificationItemsSuccess, (state, {}) => {
    return ({...state, success: 'save'})
  }),
  on(beforeSavingClasification, (state, {}) => ({
    ...state,
    success: 'unsaved',
  })),
  on(updateRegulatoryClassificationItems, (state, {}) => ({
    ...state,
    regulatoryClassificationItems: [],
    success:'save'
  })),
  on(addRegulatoryClassificationItems, (state, {}) => ({
    ...state,
    regulatoryClassificationItems: [],
    success:'save'
  }))
  
)
