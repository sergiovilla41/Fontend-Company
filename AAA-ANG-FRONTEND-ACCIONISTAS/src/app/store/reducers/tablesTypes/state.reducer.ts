import { createReducer, on } from '@ngrx/store';
import { TypesInterface } from 'src/app/model/types.model';
import { stateTrueError, stateTrueSuccess } from '../../actions/state.action';

export interface stateState {
  stateTrue?: TypesInterface[];
}

export const stateInitialState: stateState = {
  stateTrue: [],
}

export const stateReducer = createReducer(
  stateInitialState,
  on(stateTrueSuccess, (state, { stateTrue }) => {
    return { stateTrue: stateTrue }
  }),
  on(stateTrueError, (state, { msg, status }) => {
    return { ...state, msg, status }
  })
)
