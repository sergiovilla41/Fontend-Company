import { Component, OnInit } from '@angular/core';
import { GestionConjuntosDatosTemplateComponent } from '../../shared/components/templates/gestion-conjuntos-datos-template/gestion-conjuntos-datos-template.component';
import { State } from '../../store/model/state.model';
import { Store } from '@ngrx/store';
import {
  selectBasicInformation,
  selectCategories,
  selectClasificationRegulatory,
  selectDataSets,
  selectDurationISO,
  selectGranularity,
  selectHasRecord,
  selectLabels,
  selectPeriodicity,
  selectStatusSave,
  selecttypeView,
} from '../../store/selectors/datasets/dataset.selector';
import {
  beforeHasRecord,
  beforeSaving,
  getCategories,
  getClasificationRegulatory,
  getDatasets,
  getDurationISO,
  getGranularity,
  getHasRecord,
  getLabels,
  getPeriodicity,
  getTypeView,
  saveDataBasicDataSet,
  getBasicDataset,
  executePipeline,
  cancelExecutePipeline
} from '../../store/actions/dataset/dataset.action';
import { CommonModule } from '@angular/common';
import {
  PropertiesList,
  SaveDataSet,
  TypeView,
  HasRecordParameter,
} from '../../store/interfaces/common-interface';
import {
  BasicDataModel,
  CategoryTreeNode,
  HasRecordModel,
} from '../../store/model/dataset/datasets.model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import {
  getExecutionInformation,
  getExtractionSourceColumns,
  getPurposeColumn,
  getVersionColumn,
  saveExtractionColumnTargetVersion,
  saveSourceColumns,
} from '../../store/actions/columns.action';
import {
  selectPurposeColumn,
  selectSourceColumns,
  selectTargetColumn,
  selectVersionColumn,
} from '../../store/selectors/columns/columns.selector';
import { SourceColumnsSave } from '../../store/interfaces/datasets-source-columns.interface';
import {
  selectExtractionItems,
  selectExtractionState,
} from '../../store/selectors/extractions/extraction.selector';
import { ExtractionModel } from '../../store/model/extractions/extraction.model';
import {
  deleteExtractionInformation,
  getExtractionInformation,
  saveExtractionInformation,
  updateExtractionInformation,
} from '../../store/actions/extractions/extraction.action';
import {
  getExecutionsInformation,
  deleteExecutionInformation,
  saveExecutionInformation,
  updateExecutionInformation,
} from '../../store/actions/executions/execution.action';
import { ExecutionModel } from '../../store/model/executions/execution.model';
import {
  selectExecutionItems,
  selectExecutionState,
} from '../../store/selectors/executions/execution.selector';
import {
  deletePublicationInformation,
  getPublicationInformation,
  savePublicationInformation,
  updatePublicationInformation,
} from '../../store/actions/publications/publication.action';
import { PublicationModel } from '../../store/model/publications/publication.model';
import {
  selectPublicationItems,
  selectPublicationState,
} from '../../store/selectors/publications/publication.selector';

@Component({
  standalone: true,
  selector: 'gestion-conjuntos-datos-component',
  templateUrl: 'gestion-conjuntos-datos.component.html',
  styleUrls: ['gestion-conjuntos-datos.component.scss'],
  imports: [
    CommonModule,
    GestionConjuntosDatosTemplateComponent,
    ToastModule,
    MessagesModule,
  ],
  providers: [MessageService],
})
export class GestionConjuntosDatosComponent implements OnInit {
  dataSets = this.store.select(selectDataSets);
  basicDataDataSet$ = this.store.select(selectBasicInformation);
  categories$ = this.store.select(selectCategories);
  durationISO$ = this.store.select(selectDurationISO);
  granularity$ = this.store.select(selectGranularity);
  periodicity$ = this.store.select(selectPeriodicity);
  labels$ = this.store.select(selectLabels);
  statusSave$ = this.store.select(selectStatusSave);
  clasificationRegulatory$ = this.store.select(selectClasificationRegulatory);
  typeView$ = this.store.select(selecttypeView);
  HasRecord$ = this.store.select(selectHasRecord);

  purposeColumn$ = this.store.select(selectPurposeColumn);
  versionColumn$ = this.store.select(selectVersionColumn);
  targetColumn$ = this.store.select(selectTargetColumn);
  sourceColumns$ = this.store.select(selectSourceColumns);

  extractionInformation$ = this.store.select(selectExtractionItems);
  extractionDataState$ = this.store.select(selectExtractionState);
  executionData$ = this.store.select(selectExecutionItems);
  executionDataState$ = this.store.select(selectExecutionState);
  publicationData$ = this.store.select(selectPublicationItems);
  publicationDataState$ = this.store.select(selectPublicationState);

  isLoadedPurposeColumn = false;
  isLoadedTargetColumn = false;
  isLoadedSourceColumn = false;
  isLoadedbasicDataDataSet = false;

  idGenerationFile: string = '';
  basicDataDataSet: BasicDataModel = {
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

  categories: CategoryTreeNode[] = [];
  durationISO: PropertiesList[] = [];
  granularity: PropertiesList[] = [];
  periodicity: PropertiesList[] = [];
  labels: PropertiesList[] = [];
  clasificationRegulatory: PropertiesList[] = [];
  typeView: PropertiesList[] = [];
  HasRecord: HasRecordModel = {
    activeDataset: 'unactive',
  };

  constructor(
    private store: Store<State>,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.onLoadDataSet();
    this.loadInfoBasicSubscription();
    this.statusSave$.subscribe((statuss) => {
      if (statuss === 'save') {
        this.messageService.add({
          severity: 'success',
          summary: 'Actualización',
          detail: 'Se ha actualizado la información  satisfactoriamente',
        });
      }
      if (statuss === 'error') {
        this.messageService.add({
          severity: 'error',
          summary: 'Actualización',
          detail: 'Se ha generado un error actualizando  la información',
        });
      }
    });
  }

  onLoadDataSet() {
    this.store.dispatch(getDatasets());
  }

  onLoadDataAdminDataset() {
    this.store.dispatch(getCategories());
    this.store.dispatch(getDurationISO());
    this.store.dispatch(getGranularity());
    this.store.dispatch(getPeriodicity());
    this.store.dispatch(getLabels());
    this.store.dispatch(getClasificationRegulatory());
    this.store.dispatch(getTypeView());
    this.store.dispatch(
      getBasicDataset({ idConfigurationDataSet: this.idGenerationFile })
    );
    this.loadInfoBasicSubscription();
  }

  loadInfoBasicSubscription() {
    this.basicDataDataSet$.subscribe((basicData) => {
      this.isLoadedbasicDataDataSet = false;
      if (
        basicData.idConfiguracionGeneracionArchivos === '' ||
        basicData.idConfiguracionGeneracionArchivos !== this.idGenerationFile
      )
        return;
      this.basicDataDataSet = basicData;
      this.isLoadedbasicDataDataSet = true;
    });

    this.categories$.subscribe((_categories) => {
      if (_categories.length === 0) return;
      this.categories = _categories;
    });

    this.durationISO$.subscribe((_durationIso) => {
      if (_durationIso.length === 0) return;
      this.durationISO = _durationIso;
    });

    this.granularity$.subscribe((_granularity) => {
      if (_granularity.length === 0) return;
      this.granularity = _granularity;
    });

    this.periodicity$.subscribe((_periodicity) => {
      if (_periodicity.length === 0) return;
      this.periodicity = _periodicity;
    });

    this.labels$.subscribe((_labels) => {
      if (_labels.length === 0) return;
      this.labels = _labels;
    });

    this.clasificationRegulatory$.subscribe((_clasification) => {
      if (_clasification.length === 0) return;
      this.clasificationRegulatory = _clasification;
    });

    this.typeView$.subscribe((_typeView) => {
      if (_typeView.length === 0) return;
      this.typeView = _typeView;
    });

    this.HasRecord$.subscribe((_hasRecord) => {
      if (_hasRecord.activeDataset === 'unactive') return;
      this.HasRecord = _hasRecord;
    });
  }

  handleChangeView(typeView: TypeView) {
    if (typeView.view === 'listDataSets') {
      this.onLoadDataSet();
    } else {
      this.idGenerationFile = typeView.idFileGeneration;
      this.onLoadDataAdminDataset();
      this.loadColumnsInformation(this.idGenerationFile);
    }
  }

  loadColumnsInformation(idExtraction: string) {
    this.store.dispatch(
      getExecutionInformation({ idExtraction: idExtraction })
    );
    this.store.dispatch(getPurposeColumn({ typeProperty: 'columnadestino' }));
    this.store.dispatch(getVersionColumn({ typeProperty: 'columnaorigen' }));
    this.store.dispatch(
      getExtractionSourceColumns({ idExtraction: idExtraction })
    );

    this.store.dispatch(
      getExtractionInformation({
        idConfiguracionGeneracionArchivos: idExtraction,
      })
    );
    this.store.dispatch(
      getExecutionsInformation({
        idConfiguracionGeneracionArchivos: idExtraction,
      })
    );
    this.store.dispatch(
      getPublicationInformation({
        idConfiguracionGeneracionArchivos: idExtraction,
      })
    );
  }

  handleSaveSourceColumns(sourceColumn: SourceColumnsSave) {
    if (typeof sourceColumn === 'undefined' || sourceColumn === null) return;
    this.store.dispatch(beforeSaving());
    this.store.dispatch(saveSourceColumns({ sourceColumns: sourceColumn }));
  }

  handlesaveSourceColumnsVersionPurpose(sourceColumn: SourceColumnsSave) {
    if (typeof sourceColumn === 'undefined' || sourceColumn === null) return;
    this.store.dispatch(beforeSaving());
    this.store.dispatch(
      saveExtractionColumnTargetVersion({ sourceColumns: sourceColumn })
    );
  }

  handleSaveData(basicDataDataset: SaveDataSet) {
    if (typeof basicDataDataset === 'undefined' || basicDataDataset === null)
      return;
    this.store.dispatch(beforeSaving());
    this.store.dispatch(
      saveDataBasicDataSet({ dataBasicDataSet: basicDataDataset })
    );
  }

  handleHasRecord(parameter: HasRecordParameter) {
    this.store.dispatch(beforeHasRecord());
    this.store.dispatch(
      getHasRecord({ idConfigurationDataSet: parameter.idConfigurationDataSet })
    );
  }

  updateExtractionInformation(extraction: ExtractionModel) {
    this.store.dispatch(
      updateExtractionInformation({ extractionInformation: extraction })
    );
  }

  saveExtractionInformation(extraction: ExtractionModel) {
    this.store.dispatch(
      saveExtractionInformation({ extractionInformation: extraction })
    );
  }

  deleteExtractionInformation(extraction: ExtractionModel) {
    this.store.dispatch(
      deleteExtractionInformation({ extractionInformation: extraction })
    );
  }

  updateExecutionInformation(execution: ExecutionModel) {
    this.store.dispatch(
      updateExecutionInformation({ executionInformation: execution })
    );
  }

  saveExecutionInformation(execution: ExecutionModel) {
    this.store.dispatch(
      saveExecutionInformation({ executionInformation: execution })
    );
  }

  deleteExecutionInformation(execution: ExecutionModel) {
    this.store.dispatch(
      deleteExecutionInformation({ executionInformation: execution })
    );
  }

  ExecutePipeline(nbSynapse: string) {
    this.store.dispatch(executePipeline({ nbSynapseName: nbSynapse }))
  };

  CancelPipeline(pipelineId: string) {
      this.store.dispatch(cancelExecutePipeline({ pipelineRunid: pipelineId }));
  }

  updatePublicationInformation(publication: PublicationModel) {
    this.store.dispatch(
      updatePublicationInformation({ publicationInformation: publication })
    );
  }

  savePublicationInformation(publication: PublicationModel) {
    this.store.dispatch(
      savePublicationInformation({ publicationInformation: publication })
    );
  }

  deletePublicationInformation(publication: PublicationModel) {
    this.store.dispatch(
      deletePublicationInformation({ publicationInformation: publication })
    );
  }
}
