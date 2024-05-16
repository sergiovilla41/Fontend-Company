import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { RolInterface } from 'src/app/model/rol.model';
import { userRolError, userRolSuccess } from '../../actions/rol.action';

export interface rolState {
  rolList: RolInterface[];
}

export const rolListInitialState: rolState = {
  rolList: [],
}

export const rolReducer = createReducer(
  rolListInitialState,
  on(userRolSuccess, (state, { rolList }) => {
    return { rolList: rolList }
  }),
  on(userRolError, (state, { msg, status }) => {
    return { ...state, msg, status }
  })
)
