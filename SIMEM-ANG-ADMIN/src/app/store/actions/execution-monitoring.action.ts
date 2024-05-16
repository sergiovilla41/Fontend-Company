import { createAction, props } from "@ngrx/store";
import { ExecutionMonitoringModel } from "../model/execution-monitoring.model";

export const getExecutionMonitoringItems = createAction("getExecutionMonitoring")
export const getExecutionMonitoringItemsSuccess = createAction("getExecutionMonitoringSuccess", props<{executionMonitoringItems: ExecutionMonitoringModel[]}>())
export const getExecutionMonitoringItemsError = createAction("getExecutionMonitoringError")