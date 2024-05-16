import { createAction, props } from '@ngrx/store';
import { ExecutionModel } from '../../model/executions/execution.model';

export const getExecutionsInformation = createAction(
  'getExecutionsInformation',
  props<{ idConfiguracionGeneracionArchivos: string }>()
);
export const getExecutionsInformationSuccess = createAction(
  'getExecutionsInformationSuccess',
  props<{ executionInformation: ExecutionModel[] }>()
);
export const getExecutionsInformationError = createAction('getExecutionsInformationError');

export const saveExecutionInformation = createAction(
  'saveExecutionInformation',
  props<{ executionInformation: ExecutionModel }>()
);

export const updateExecutionInformation = createAction(
  'updateExecutionInformation',
  props<{ executionInformation: ExecutionModel }>()
);

export const deleteExecutionInformation = createAction(
  'deleteExecutionInformation',
  props<{ executionInformation: ExecutionModel }>()
);

export const saveExecutionInformationError = createAction('saveExecutionInformationError');