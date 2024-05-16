import { PropertiesList } from "../../interfaces/common-interface";
import { ExtractionPropertiesModel } from "../../model/extractions.model";
import { State } from "../../model/state.model";

export const selectSourceColumns = (state: State) =>
  state.extraction.sourceColumns;

export const selectPurposeColumn = (state: State) =>
  state.extraction.purposeColumn?.map(
    (val): PropertiesList => PropertiesModelToPurposeColumn(val)
  );

export const selectVersionColumn = (state: State) =>
  state.extraction.purposeColumn?.map(
    (val): PropertiesList => PropertiesModelToPurposeColumn(val)
  );

export const selectTargetColumn = (state: State) =>
  state.extraction.versionColumn?.map(
    (val): PropertiesList => PropertiesModelToVersionColumn(val)
  );


export const PropertiesModelToPurposeColumn = (
  propertiesModel: ExtractionPropertiesModel
): PropertiesList => ({
  code: propertiesModel.idDestinationColumn.toString(),
  name: propertiesModel.value,
  dataType: propertiesModel.dataType,
  description: propertiesModel.description,
});

export const PropertiesModelToVersionColumn = (
  propertiesModel: ExtractionPropertiesModel
): PropertiesList => ({
  code: propertiesModel.idDestinationColumn.toString(),
  name: propertiesModel.value,
  dataType: propertiesModel.dataType,
  description: propertiesModel.description,
});

export const selectStatusSave = (state: State) => state.extraction.success;
