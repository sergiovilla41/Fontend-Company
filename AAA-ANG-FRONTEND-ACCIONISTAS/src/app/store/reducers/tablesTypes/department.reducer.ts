import { createReducer, on } from '@ngrx/store';
import { countryCitiesInterface } from 'src/app/model/countryCities.model';
import { departmentSuccess, departmentError } from '../../actions/department.action';

export interface departmentState {
  department?: countryCitiesInterface[];
}

export const departamentInitialState: departmentState = {
  department: [],
}

export const departmentReducer = createReducer(
  departamentInitialState,
  on(departmentSuccess, (state, { department }) => {
    return { department: department }
  }),
  on(departmentError, (state, { msg, status }) => {
    return { ...state, msg, status }
  })
)
