import { SaveDataSet } from '../../store/interfaces/common-interface';
import { SourceColumnsSave } from '../../store/interfaces/datasets-source-columns.interface';
import { DataSetModel } from '../../store/model/dataset/datasets.model';

export const recordDataset: DataSetModel[] = [
  {
    idDataSet: 'ade905',
    idConfigurationFileGeneration: 'ade905f7-cb05-4ff9-90d9-00979f798894',
    title: 'Panorama energético Corto Plazo Generación',
    theme: 'InformacionOperativaPeriodicaSIN',
    fileNameDestination: '10_PanoramaEnergeticoCortoPlazoGeneracion',
    idGranularity: '7427d737-4840-4f8b-937c-5863feb23fb1',
    nameGranularity: 'ef427263-f704-4e33-bdba-9289f008a833',
    idPeriodicity: 'Semanal',
    periodicity: 'Semanal',
    nbSynapse: 'NB_InformacionOperativaPeriodicaSIN_GeneracionCasos',
    initialDeltaValue: new Date('2023-11-01T00:00:00'),
    finalDeltaValue: new Date('2023-11-30T00:00:00'),
    idGenerationFileMaster: '',
    generationFileMaster: '',
    state: true,
  },
];

export const columnsSaveMock: SourceColumnsSave = {
  idColumnaOrigen: 'f074b8bf-098a-4b60-8d4a-a9b0b659765e',
  numeracion: 0,
  columnaOrigen: '',
  idColumnaDestino: 'f074b8bf-098a-4b60-8d4a-a9b0b659765e',
  tipoDato: '',
  descripcion: '',
  idExtraccion: '',
  extraccionIdColumnaDestino: 'f074b8bf-098a-4b60-8d4a-a9b0b659765e',
  extraccionColumnaVersion: 'f074b8bf-098a-4b60-8d4a-a9b0b659765e',
};

export const saveDatasetMock: SaveDataSet = {
  idConfiguracionGeneracionArchivos: 'f074b8bf-098a-4b60-8d4a-a9b0b659765e',
  tema: 'InformacionOperativaPeriodicaSIN',
  nombreArchivoDestino: '10_PanoramaEnergeticoCortoPlazoGeneracion',
  datoObligatorio: false,
  indRegulatorio: false,
  selectXM: '',
  nbSynapse: '',
  idDuracionISO: '',
  valorDeltaInicial: '2023-11-01T00:00:00',
  valorDeltaFinal: '2023-11-01T00:00:00',
  ultimaFechaIndexado: '',
  ultimaFechaActualizado: '',
  idPeriodicidad: 'Semanal',
  titulo: 'Panorama energético Corto Plazo Generación',
  descripcion: '',
  privacidad: false,
  idCategoria: '',
  idTipoVista: '',
  idGranularidad: '7427d737-4840-4f8b-937c-5863feb23fb1',
  entidadOrigen: '',
  estado: false,
  idConfiguracionClasificacionRegulatoria: '',
  etiquetas: [],
  nombreCategoria: '',
};
