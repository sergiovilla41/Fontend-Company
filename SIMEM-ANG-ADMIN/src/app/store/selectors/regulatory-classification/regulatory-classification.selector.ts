
import { CommomDropdown } from "../../../shared/helpers/common-dropdown";
import { RegulatoryClassificationData } from "../../interfaces/regulatory-classification.interface";
import { RegulatoryClassificationModel } from "../../model/regulatory-classification.model";
import { State } from "../../model/state.model";

export const selectRegulatoryClassificationItems = (state: State): RegulatoryClassificationModel[] =>
  state.regulatoryClassification.regulatoryClassificationItems;

  export const selectRegulatoryClassificationStatusSave = (state: State) =>
    state.regulatoryClassification.success;

