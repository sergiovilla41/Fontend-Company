import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { TypesInterface } from 'src/app/model/types.model';
import { personTypesError, personTypesSuccess } from '../../actions/personType.action';

export interface personTypesState {
  personTypesList: TypesInterface[];
}

export const personTypeInitialState: personTypesState = {
  personTypesList: [],
}

export const personTypeReducer = createReducer(
  personTypeInitialState,
  on(personTypesSuccess, (state, { personTypesList }) => {
    return { personTypesList: personTypesList }
  }),
  on(personTypesError, (state, { msg, status }) => {
    return { ...state, msg, status }
  })
)
