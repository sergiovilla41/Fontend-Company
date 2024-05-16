import { State } from '../../model/state.model';
import _moment from 'moment';
const moment = _moment;

export const selectRegulatoryDatasetsItems = (state: State) =>
  state?.regulatoryDatasets.regulatoryDatasetsItems.map((a) => ({
    ...a,
    maximaFechaRegulatoria: a.maximaFechaRegulatoria
      ? moment(a.maximaFechaRegulatoria).toDate()
      : undefined,
    fechaProximaEjecucion: a.fechaProximaEjecucion
      ? moment(a.fechaProximaEjecucion).toDate()
      : undefined,
    deltaInicialEjecutar: moment(a.deltaInicialEjecutar).toDate(),
    deltaFinalEjecutar: moment(a.deltaFinalEjecutar).toDate(),
  }));
