export interface PropertiesList {
  code: string;
  name: string;
  dataType: string;
  description: string;
}

export interface ItemNewValue {
  value: string | null;
  name: string | null;
}

export interface ItemObject {
  itemSelected: string;
  name: string;
  items: PropertiesList[];
}

export interface TypeView {
  view: string;
  idFileGeneration: string;
}

export interface DatePickerObject {
  date: any;
  name: string;
}

export interface SaveDataSet {
  idConfiguracionGeneracionArchivos: string;
  tema: string;
  nombreArchivoDestino: string;
  datoObligatorio: boolean;
  indRegulatorio: boolean;
  selectXM: string;
  nbSynapse: string;
  idDuracionISO: string;
  valorDeltaInicial: string;
  valorDeltaFinal: string;
  ultimaFechaIndexado: string;
  ultimaFechaActualizado: string;
  idPeriodicidad: string;
  titulo: string;
  descripcion: string;
  privacidad: boolean;
  idCategoria: string;
  idTipoVista: string;
  idGranularidad: string;
  entidadOrigen: string;
  estado: boolean;
  idConfiguracionClasificacionRegulatoria: string;
  etiquetas: string[];
  nombreCategoria: string;
}

export interface HasRecordParameter {
  idConfigurationDataSet: string;
}
