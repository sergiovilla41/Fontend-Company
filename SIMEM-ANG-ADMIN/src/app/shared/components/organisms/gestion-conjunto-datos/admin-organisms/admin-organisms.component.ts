import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import {
  HasRecordParameter,
  PropertiesList,
  SaveDataSet,
  TypeView,
} from '../../../../../store/interfaces/common-interface';
import {
  BasicDataModel,
  CategoryTreeNode,
  HasRecordModel,
  SourceColumnsModel,
} from '../../../../../store/model/dataset/datasets.model';
import { CardModule } from 'primeng/card';
import { BackButtonListComponent } from '../../../atoms/back-button-list/back-button-list.component';
import { InfoBasicaOrganismsComponent } from '../info-basica-organisms/info-basica-organisms.component';
import { SourceColumnsSave } from '../../../../../store/interfaces/datasets-source-columns.interface';
import { ExtractionOrganismsComponent } from '../extraction-organisms/extraction-organisms.component'
import { ColumnasOrigenOrganismsComponent } from '../columnas-origen/columnas-origen-organisms.component';
import { ExecutionOrganismsComponent } from '../execution-organisms/execution-organisms.component'
import { PublicationOrganismsComponent } from '../publication-organisms/publication-organisms.component';
import { ExtractionModel } from '../../../../../store/model/extractions/extraction.model';
import { ExecutionModel } from '../../../../../store/model/executions/execution.model';
import { ExecutionData } from '../../../../../store/interfaces/executions/execution.interface';
import { PublicationModel } from '../../../../../store/model/publications/publication.model';
import { PublicationData } from '../../../../../store/interfaces/publications/publication.interface';

@Component({
  selector: 'simem-admin-organisms',
  standalone: true,
  templateUrl: './admin-organisms.component.html',
  styleUrl: './admin-organisms.component.scss',
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    InputTextModule,
    TabViewModule,
    InfoBasicaOrganismsComponent,
    ColumnasOrigenOrganismsComponent,
    BackButtonListComponent,
    ExtractionOrganismsComponent,
    ExecutionOrganismsComponent,
    PublicationOrganismsComponent
  ],
})
export class AdminOrganismsComponent {
  @Output() changeView = new EventEmitter<TypeView>();
  @Output() saveSourceColumns = new EventEmitter<SourceColumnsSave>();
  @Output() saveSourceColumnsVersionPurpose =
    new EventEmitter<SourceColumnsSave>();
  @Output() saveData = new EventEmitter<SaveDataSet>();
  @Output() hasRecord = new EventEmitter<HasRecordParameter>();

  @Output() updateExtractionInformation = new EventEmitter<ExtractionModel>();
  @Output() saveExtractionInformation = new EventEmitter<ExtractionModel>();
  @Output() deleteExtractionInformation = new EventEmitter<ExtractionModel>();

  @Output() updateExecutionInformation = new EventEmitter<ExecutionModel>();
  @Output() saveExecutionInformation = new EventEmitter<ExecutionModel>();
  @Output() deleteExecutionInformation = new EventEmitter<ExecutionModel>();

  @Output() updatePublicationInformation = new EventEmitter<PublicationModel>();
  @Output() savePublicationInformation = new EventEmitter<PublicationModel>();
  @Output() deletePublicationInformation = new EventEmitter<PublicationModel>();

  @Input() purposeColumn: PropertiesList[] = [];
  @Input() sourceColumns: SourceColumnsModel[] = [];
  @Input() versionColumn: PropertiesList[] = [];
  @Input() targetColumn: PropertiesList[] = [];
  @Input() clasificationRegulatory: PropertiesList[] = [];

  @Input() isLoadedPurposeColumn = false;
  @Input() isLoadedTargetColumn = false;
  @Input() isLoadedSourceColumn = false;

  @Input() basicDataDataSet: BasicDataModel = {
    idConfiguracionGeneracionArchivos: '',
    tema: '',
    nombreArchivoDestino: '',
    datoObligatorio: false,
    indRegulatorio: false,
    selectXM: '',
    nbSynapse: '',
    idDuracionISO: '',
    valorDeltaInicial: '',
    valorDeltaFinal: '',
    ultimaFechaActualizado: '',
    idPeriodicidad: '',
    titulo: '',
    descripcion: '',
    privacidad: false,
    idCategoria: '',
    idTipoVista: '',
    idGranularidad: '',
    entidadOrigen: '',
    estado: false,
    idConfiguracionClasificacionRegulatoria: '',
    etiquetas: [],
    nombreCategoria: '',
  };

  @Input() isLoadedbasicDataDataSet: boolean = false;
  @Input() categories: CategoryTreeNode[] = [];
  @Input() durationISO: PropertiesList[] = [];
  @Input() granularity: PropertiesList[] = [];
  @Input() periodicity: PropertiesList[] = [];
  @Input() labels: PropertiesList[] = [];
  @Input() typeView: PropertiesList[] = [];
  @Input() HasRecord!: HasRecordModel;

  @Input() extractionInformation!: ExtractionModel[];
  @Input() extractionDataState!: string | null;
  @Input() executionData!: ExecutionData[];
  @Input() executionDataState!: string | null;
  @Input() publicationData!: PublicationData[];
  @Input() publicationDataState!: string | null;

  goBack() {
    this.changeView.emit({
      view: 'listDataSets',
      idFileGeneration: '',
    });
  }

  handleSaveSourceColumns(sourceColumns: SourceColumnsSave) {
    if (typeof sourceColumns === 'undefined' || sourceColumns === null) return;
    this.saveSourceColumns.emit(sourceColumns);
  }

  handlesaveSourceColumnsVersionPurpose(
    sourceColumnsVersionPurpose: SourceColumnsSave
  ) {
    if (
      typeof sourceColumnsVersionPurpose === 'undefined' ||
      sourceColumnsVersionPurpose === null
    )
      return;
    this.saveSourceColumnsVersionPurpose.emit(sourceColumnsVersionPurpose);
  }

  handleSaveData(basicDataDataset: SaveDataSet) {
    if (typeof basicDataDataset === 'undefined' || basicDataDataset === null)
      return;
    this.saveData.emit(basicDataDataset);
  }

  handleHasRecord(idConfigurationDataSet: HasRecordParameter) {
    if (
      typeof idConfigurationDataSet === 'undefined' ||
      idConfigurationDataSet === null
    )
      return;
    this.hasRecord.emit(idConfigurationDataSet);
  }
  
  handleUpdateExtractionInformation(extraction: any) {
    this.updateExtractionInformation.emit(extraction);
  }

  handleSaveExtractionInformation(extraction: any) {
    this.saveExtractionInformation.emit(extraction);
  }

  handleDeleteExtractionInformation(extraction: any) {
    this.deleteExtractionInformation.emit(extraction);
  }
  
  handleUpdateExecutionInformation(execution: ExecutionModel) {
    this.updateExecutionInformation.emit(execution);
  }

  handleSaveExecutionInformation(execution: ExecutionModel) {
    this.saveExecutionInformation.emit(execution);
  }

  handleDeleteExecutionInformation(execution: ExecutionModel) {
    this.deleteExecutionInformation.emit(execution);
  }
  
  handleUpdatePublicationInformation(publication: PublicationModel) {
    this.updatePublicationInformation.emit(publication);
  }

  handleSavePublicationInformation(publication: PublicationModel) {
    this.savePublicationInformation.emit(publication);
  }

  handleDeletePublicationInformation(publication: PublicationModel) {
    this.deletePublicationInformation.emit(publication);
  }
}
