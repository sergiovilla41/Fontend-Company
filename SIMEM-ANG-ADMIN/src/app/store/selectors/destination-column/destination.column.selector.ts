
import { DestinationColumnModel } from "../../model/destination-column/destination.column.model";
import { State } from "../../model/state.model";


export const selectDestinationColumns = (state: State): DestinationColumnModel[] | null =>
  state.destinationColumn.destinationColumns;


export const selectDestinationColumnStatusSave = (state: State): string =>
  state.destinationColumn.success;
