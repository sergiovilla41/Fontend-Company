import { createReducer, on } from '@ngrx/store';
import { TypesInterface } from 'src/app/model/types.model';
import { identificationTypeError, identificationTypeSuccess } from '../../actions/identificationType.action';

export interface identificationTypeState {
  identificationTypeList: TypesInterface[];
}

export const identificationTypeInitialState: identificationTypeState = {
  identificationTypeList: [],
}

export const identificationTypeReducer = createReducer(
  identificationTypeInitialState,
  on(identificationTypeSuccess, (state, { identificationTypeList }) => {
    return { identificationTypeList: identificationTypeList }
  }),
  on(identificationTypeError, (state, { msg, status }) => {
    return { ...state, msg, status }
  })
)
