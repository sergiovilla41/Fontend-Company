import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { TypesInterface } from 'src/app/model/types.model';
import { personTypesError, personTypesSuccess } from '../../actions/personType.action';
import { shareholderTypesError, shareholderTypesSuccess } from '../../actions/shareholderType.action';

export interface shareholderTypesState {
  shareholdersTypesList: TypesInterface[];
}

export const shareholderTypeInitialState: shareholderTypesState = {
  shareholdersTypesList: [],
}

export const shareholderTypeReducer = createReducer(
  shareholderTypeInitialState,
  on(shareholderTypesSuccess, (state, { shareholdersTypesList }) => {
    return { shareholdersTypesList: shareholdersTypesList }
  }),
  on(shareholderTypesError, (state, { msg, status }) => {
    return { ...state, msg, status }
  })
)
