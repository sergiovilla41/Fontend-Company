import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs';
import {
  ExecutionService,
  executionResponseToExecutionModel,
} from '../../http/executions/execution.service';
import {
  deleteExecutionInformation,
  getExecutionsInformation,
  getExecutionsInformationSuccess,
  saveExecutionInformation,
  saveExecutionInformationError,
  updateExecutionInformation,
} from '../../actions/executions/execution.action';

@Injectable()
export class ExecutionEffect {
  constructor(private actions$: Actions, private service: ExecutionService) {}

  getExecutionsInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getExecutionsInformation),
      exhaustMap(({ idConfiguracionGeneracionArchivos }) =>
        this.service.getExecutions(idConfiguracionGeneracionArchivos).pipe(
          map((executionInformation) => {
            return getExecutionsInformationSuccess({
              executionInformation: executionInformation.map((x) =>
                executionResponseToExecutionModel(x)
              ),
            });
          })
        )
      )
    )
  );

  saveExecutionInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveExecutionInformation),
      exhaustMap(({ executionInformation }) =>
        this.service.saveExecution(executionInformation).pipe(
          map(() =>
            getExecutionsInformation({
              idConfiguracionGeneracionArchivos:
                executionInformation.idConfiguracionGeneracionArchivos,
            })
          ),
          catchError(() => [saveExecutionInformationError()])
        )
      )
    )
  );

  updateExecutionInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateExecutionInformation),
      exhaustMap(({ executionInformation }) =>
        this.service.updateExecution(executionInformation).pipe(
          map(() =>
            getExecutionsInformation({
              idConfiguracionGeneracionArchivos:
                executionInformation.idConfiguracionGeneracionArchivos,
            })
          ),
          catchError(() => [saveExecutionInformationError()])
        )
      )
    )
  );

  deleteExecutionInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteExecutionInformation),
      exhaustMap(({ executionInformation }) =>
        this.service.deleteExecution(executionInformation.idEjecucion).pipe(
          map(() =>
            getExecutionsInformation({
              idConfiguracionGeneracionArchivos:
                executionInformation.idConfiguracionGeneracionArchivos,
            })
          ),
          catchError(() => [saveExecutionInformationError()])
        )
      )
    )
  );
}
