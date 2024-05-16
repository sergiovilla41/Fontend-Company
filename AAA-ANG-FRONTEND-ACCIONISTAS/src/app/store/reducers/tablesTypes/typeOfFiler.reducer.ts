import { createReducer, on } from '@ngrx/store';
import { TypesInterface } from 'src/app/model/types.model';
import { typeOfFilerError, typeOfFilerSuccess } from '../../actions/typeOfFiler.action';

export interface typeOfFilerState {
  typeOfFilerList: TypesInterface[];
}

export const typeOfFilterListInitialState: typeOfFilerState = {
  typeOfFilerList: [],
}

export const typeOfFilerListReducer = createReducer(
  typeOfFilterListInitialState,
  on(typeOfFilerSuccess, (state, { typeOfFilerList }) => {
    return { typeOfFilerList: typeOfFilerList }
  }),
  on(typeOfFilerError, (state, { msg, status }) => {
    return { ...state, msg, status }
  })
)
