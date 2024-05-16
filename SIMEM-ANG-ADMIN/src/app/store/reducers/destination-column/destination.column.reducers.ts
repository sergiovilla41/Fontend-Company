import { createReducer, on } from "@ngrx/store";
import { DestinationColumnModel } from "../../model/destination-column/destination.column.model";
import { addDestinationColumnSuccess, clearDestinationColumnStatus, getDestinationColumnSuccess, updateDestinationColumnSuccess } from "../../actions/destination-column/destination.column.action";


export interface DestinationColumnState {
  destinationColumns: DestinationColumnModel[] | null;
  success: string;
}

export const initialDestinationColumnState: DestinationColumnState = {
  destinationColumns: null,
  success: 'unsaved'
};

export const destinationColumnReducer = createReducer(
  initialDestinationColumnState,
  on(getDestinationColumnSuccess, (state, { destinationColumns }) =>
    ({ ...state, destinationColumns })
  ),
  on(updateDestinationColumnSuccess, (state) =>
    ({ ...state, success: 'save' })
  ),
  on(addDestinationColumnSuccess, (state) =>
    ({ ...state, success: 'save' })
  ),
  on(clearDestinationColumnStatus, (state) =>
    ({ ...state, success: 'unsaved' })
  ),
);
