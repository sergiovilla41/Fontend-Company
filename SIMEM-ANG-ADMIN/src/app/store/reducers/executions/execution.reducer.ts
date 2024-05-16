import { createReducer, on } from '@ngrx/store';
import { ExecutionModel } from '../../model/executions/execution.model';
import { getExecutionsInformationSuccess } from '../../actions/executions/execution.action';

export interface ExecutionInformationState {
  executionInformation: ExecutionModel[];
  executionDataState: string;
}

export const executionInformationState: ExecutionInformationState = {
  executionInformation: [],
  executionDataState: 'OK',
};

export const executionReducer = createReducer(
    executionInformationState,
  on(getExecutionsInformationSuccess, (state, { executionInformation }) => {
    return { ...state, executionInformation, executionDataState: 'OK' };
  })
);
