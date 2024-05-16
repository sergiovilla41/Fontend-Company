import { createReducer, on } from '@ngrx/store';
import { ExecutionMonitoringModel } from '../../model/execution-monitoring.model';
import { getExecutionMonitoringItemsSuccess } from '../../actions/execution-monitoring.action';

export interface ExecutionMonitoringInitialState {
  executionMonitoringItems: ExecutionMonitoringModel[];
}

export const executionMonitoringInitialState: ExecutionMonitoringInitialState =
  {
    executionMonitoringItems: [],
  };

export const executionMonitoringReducer = createReducer(
  executionMonitoringInitialState,
  on(
    getExecutionMonitoringItemsSuccess,
    (state, { executionMonitoringItems }) => {
      return { ...state, executionMonitoringItems };
    }
  )
);
