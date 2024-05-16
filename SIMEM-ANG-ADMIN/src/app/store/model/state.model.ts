import { ExtractionInitialState } from '../reducers/columns/extraction.reducer';
import { DataSetInitialState } from '../reducers/dataSets/dataSets.reducer';
import { ExecutionMonitoringInitialState } from '../reducers/execution-monitoring/execution-monitoring.reducer';
import { LabelState } from '../reducers/labels/labels.reducer';
import { ExecutionInformationState } from '../reducers/executions/execution.reducer';
import { ExtractionInformationState } from '../reducers/extractions/extraction.reducer';
import { MenuInitialState } from '../reducers/menu/menu.reducer';
import { RegulatoryClassificationInitialState } from '../reducers/regulatory-classification/regulatory-classification.reducer';
import { RegulatoryDatasetsInitialState } from '../reducers/regulatory-datasets/regulatory-datasets.reducer';
import { UserState } from '../reducers/user/user.reducer';
import { SecurityState } from '../reducers/security/security.reducer';
import { PublicationInformationState } from '../reducers/publications/publication.reducer';
import { DestinationColumnState } from '../reducers/destination-column/destination.column.reducers';

export interface State {
  dataSets: DataSetInitialState;
  menu: MenuInitialState;
  executionMonitoring: ExecutionMonitoringInitialState;
  regulatoryDatasets: RegulatoryDatasetsInitialState;
  extraction: ExtractionInitialState;
  user: UserState;
  labels: LabelState;
  regulatoryClassification: RegulatoryClassificationInitialState;
  extractionInformation: ExtractionInformationState;
  executionInformation: ExecutionInformationState;
  security: SecurityState;
  publicationInformation: PublicationInformationState;
  destinationColumn: DestinationColumnState;
}
