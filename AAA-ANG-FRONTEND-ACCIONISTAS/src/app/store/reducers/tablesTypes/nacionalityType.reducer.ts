import { createReducer, on } from '@ngrx/store';
import { TypesInterface } from 'src/app/model/types.model';
import { nacionalityTypeError, nacionalityTypeSuccess } from '../../actions/nacionalityType.action';


export interface nacionalityTypeState {
  nacionalityTypeList: TypesInterface[];
}

export const nacionalityTypeListInitialState: nacionalityTypeState = {
  nacionalityTypeList: [],
}

export const nacionalityTypeListReducer = createReducer(
  nacionalityTypeListInitialState,
  on(nacionalityTypeSuccess, (state, { nacionalityTypeList }) => {
    return { nacionalityTypeList: nacionalityTypeList }
  }),
  on(nacionalityTypeError, (state, { msg, status }) => {
    return { ...state, msg, status }
  })
)
