import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackButtonComponent } from '../../atoms/back-button/back-button.component';
import {
  BasicDataModel,
  CategoryTreeNode,
  DataSetModel,
  HasRecordModel,
  SourceColumnsModel,
} from '../../../../store/model/dataset/datasets.model';
import { ListaOrganismsComponent } from '../../organisms/gestion-conjunto-datos/lista-organisms/lista-organisms.component';
import { AdminOrganismsComponent } from '../../organisms/gestion-conjunto-datos/admin-organisms/admin-organisms.component';
import {
  PropertiesList,
  SaveDataSet,
  TypeView,
} from '../../../../store/interfaces/common-interface';
import { SourceColumnsSave } from '../../../../store/interfaces/datasets-source-columns.interface';
import { CommonModule } from '@angular/common';
import { ExtractionModel } from '../../../../store/model/extractions/extraction.model';
import { ExecutionData } from '../../../../store/interfaces/executions/execution.interface';
import { ExecutionModel } from '../../../../store/model/executions/execution.model';
import { PublicationModel } from '../../../../store/model/publications/publication.model';
import { PublicationData } from '../../../../store/interfaces/publications/publication.interface';

@Component({
  standalone: true,
  selector: 'gestion-conjuntos-datos-template',
  templateUrl: 'gestion-conjuntos-datos-template.component.html',
  styleUrls: ['gestion-conjuntos-datos-template.component.scss'],
  imports: [
    CommonModule,
    AdminOrganismsComponent,
    ListaOrganismsComponent,
    BackButtonComponent,
  ],
})
export class GestionConjuntosDatosTemplateComponent {
  @Output() changeView = new EventEmitter<TypeView>();
  @Output() saveSourceColumns = new EventEmitter<SourceColumnsSave>();
  @Output() saveSourceColumnsVersionPurpose =
    new EventEmitter<SourceColumnsSave>();
  @Output() saveData = new EventEmitter<SaveDataSet>();
  @Output() hasRecord = new EventEmitter<any>();

  @Output() updateExtractionInformation = new EventEmitter<ExtractionModel>();
  @Output() saveExtractionInformation = new EventEmitter<ExtractionModel>();
  @Output() deleteExtractionInformation = new EventEmitter<ExtractionModel>();

  @Output() updateExecutionInformation = new EventEmitter<ExecutionModel>();
  @Output() saveExecutionInformation = new EventEmitter<ExecutionModel>();
  @Output() deleteExecutionInformation = new EventEmitter<ExecutionModel>();
  @Output() onExecutePipeline = new EventEmitter<string>();
  @Output() onCancelPipeline = new EventEmitter<string>();

  @Output() updatePublicationInformation = new EventEmitter<PublicationModel>();
  @Output() savePublicationInformation = new EventEmitter<PublicationModel>();
  @Output() deletePublicationInformation = new EventEmitter<PublicationModel>();


  @Input() dataSets: DataSetModel[] = [];
  @Input() sourceColumns: SourceColumnsModel[] = [];
  @Input() purposeColumn: PropertiesList[] = [];
  @Input() versionColumn: PropertiesList[] = [];
  @Input() targetColumn: PropertiesList[] = [];
  @Input() clasificationRegulatory: PropertiesList[] = [];
  @Input() isLoadedTargetColumn = false;
  @Input() isLoadedPurposeColumn = false;

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

  title: string = "Gestión de conjuntos de datos";

  isListDataset = true;
  isAdminDataset = false;

  executePipeline(event: string) {
    this.onExecutePipeline.emit(event);
  }

  cancelPipeline(event: string) {
    this.onCancelPipeline.emit(event);
  }

  handleChangeView(typeView: TypeView) {
    if (typeView.view === 'listDataSets') {
      this.title = "Gestión de conjuntos de datos";
      this.isListDataset = true;
      this.isAdminDataset = false;
    } else {
      this.title = "Editar conjunto de datos";
      this.isAdminDataset = true;
      this.isListDataset = false;
    }
    this.changeView.emit(typeView);
  }

  handleSaveSourceColumns(sourceColumns: any) {
    if (typeof sourceColumns === 'undefined' || sourceColumns === null) return;
    this.saveSourceColumns.emit(sourceColumns);
  }

  handlesaveSourceColumnsVersionPurpose(sourceColumnsVersionPurpose: any) {
    if (
      typeof sourceColumnsVersionPurpose === 'undefined' ||
      sourceColumnsVersionPurpose === null
    )
      return;
    this.saveSourceColumnsVersionPurpose.emit(sourceColumnsVersionPurpose);
  }

  handleSaveData(basicDataDataset: any) {
    if (typeof basicDataDataset === 'undefined' || basicDataDataset === null)
      return;
    this.saveData.emit(basicDataDataset);
  }

  handleHasRecord(idConfigurationDataSet: any) {
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
