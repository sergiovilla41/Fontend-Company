import { createAction, props } from "@ngrx/store";
import { DestinationColumnModel } from "../../model/destination-column/destination.column.model";



export const getDestinationColumn = createAction("Get Destination Column");


export const getDestinationColumnSuccess = createAction(
  "Get Destination Column Success",
  props<{ destinationColumns: DestinationColumnModel[] }>()
);


export const getDestinationColumnError = createAction(
  "Get Destination Column Error",
  props<{ error: any }>()
);


export const updateDestinationColumn = createAction(
  "Update Destination Column",
  props<{ destinationColumn: DestinationColumnModel }>()
);


export const updateDestinationColumnSuccess = createAction(
  "Update Destination Column Success",
  props<{ destinationColumn: DestinationColumnModel }>()
);


export const updateDestinationColumnError = createAction(
  "Update Destination Column Error",
  props<{ error: any }>()
);


export const addDestinationColumn = createAction(
  "Add Destination Column",
  props<{ destinationColumn: DestinationColumnModel }>()
);


export const addDestinationColumnSuccess = createAction(
  "Add Destination Column Success",
  props<{ destinationColumn: DestinationColumnModel }>()
);


export const addDestinationColumnError = createAction(
  "Add Destination Column Error",
  props<{ error: any }>()
);


export const clearDestinationColumnStatus = createAction(
  "Clear Destination Column Status"
);

