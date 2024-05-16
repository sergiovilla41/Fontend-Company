import { createReducer, on } from '@ngrx/store';
import { TypesInterface } from 'src/app/model/types.model';
import { identificationTypeError, identificationTypeSuccess } from '../../actions/identificationType.action';
import { TypeSourceError, TypeSourceSuccess } from '../../actions/TypeSource.action';

export interface TypeSourceState {
  typeSourceList: TypesInterface[];
}

export const typeSourceInitialState: TypeSourceState = {
  typeSourceList: [],
}

export const typeSourceReducer = createReducer(
  typeSourceInitialState,
  on(TypeSourceSuccess, (state, { typeSourceList }) => {
    return { typeSourceList: typeSourceList }
  }),
  on(TypeSourceError, (state, { msg, status }) => {
    return { ...state, msg, status }
  })
)
