import { State } from '../../store/model/state.model';
import { recordDataset } from './datasets.mock';

export const initialState: State = {
  menu: {
    menuItems: [
      {
        id: '1',
        children: [
          {
            id: '1',
            icon: 'icon',
            name: 'Inicio',
            url: 'url',
          },
        ],
        icon: 'icon',
        name: 'Inicio',
        url: 'url',
      },
    ],
  },
  regulatoryDatasets: {
    regulatoryDatasetsItems: [],
  },
  executionMonitoring: {
    executionMonitoringItems: [],
  },
  dataSets: {
    dataSetsItems: recordDataset,
    basicDataDataSet: {
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
    },
    categoriesItems: [],
    durationISOItems: [],
    granularityItems: [],
    periodicityItems: [],
    lablesItems: [],
    success: '',
    hasRecord: {
      activeDataset: 'inactive',
    },
    clasificationRegulatory: [],
    typeViewItems: [],
  },
  extraction: {
    purposeColumn: [],
    sourceColumns: [],
    success: '',
    versionColumn: [],
  },
  extractionInformation: {
    extractionInformation: [],
    extractionDataState: '',
  },
  regulatoryClassification: {
    regulatoryClassificationItems: [],
    success: '',
  },
  executionInformation: {
    executionInformation: [],
    executionDataState: '',
  },
  labels: { createdState: true, labels: [], updatedState: true },
  publicationInformation: { publicationDataState: "", publicationInformation: [] },
  security: { isAllowed: false },
  user: { createdUser: true, empresaDominioList: [], updatedUser: true, userList: [] },
  destinationColumn: {
    destinationColumns: null,
    success: 'unsaved'
  }
};
