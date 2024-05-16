import { createReducer, on } from '@ngrx/store';
import { forgotPasswordSuccess, forgotPasswordError, UpdateState } from '../../actions/forgotPassword.action';


export interface forgotPasswordState {
  text?: string;
  state?: number;
  email?: string;
  msg?: string;
  status?: number;
  value?: string;
  param?: string;
}


export const forgotPasswordInitialState: forgotPasswordState = {
}

export const forgotPasswordReducer = createReducer(
  forgotPasswordInitialState,
  on(forgotPasswordSuccess, (state, { msg, status }) => {
    return { msg, status };
  }),
  on(forgotPasswordError, (state, { msg, value, param, status }) => {
    return { msg, value, param, status }
  }),
  on(UpdateState, (state) => {
    return { msg: null, status: null }
  })

)
