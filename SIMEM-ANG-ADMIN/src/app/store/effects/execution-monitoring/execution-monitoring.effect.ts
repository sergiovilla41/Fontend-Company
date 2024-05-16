import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map } from "rxjs";
import { ExecutionMonitoringResponseToExecutionMonitoringModel, ExecutionMonitoringService } from "../../http/execution-monitoring/execution-monitoring.service";
import { getExecutionMonitoringItems, getExecutionMonitoringItemsSuccess } from "../../actions/execution-monitoring.action";

@Injectable()
export class ExecutionMonitoringEffect {
  constructor(private actions$: Actions, private service: ExecutionMonitoringService) { }

  getExecutionMonitoringItems$ = createEffect(() => this.actions$.pipe(
    ofType(getExecutionMonitoringItems),
    exhaustMap(() => this.service.getExecutionMonitoring()
      .pipe(
        map((executionMonitoringItems) => getExecutionMonitoringItemsSuccess({executionMonitoringItems : executionMonitoringItems.map(a => ExecutionMonitoringResponseToExecutionMonitoringModel(a)) }))
      ))
  )
  );
}