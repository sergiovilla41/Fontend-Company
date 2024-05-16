import { createReducer, on } from '@ngrx/store';
import { Shareholders } from 'src/app/model/shareholders.model';
import { exportCsvShareholder, exportCsvShareholderError, exportCsvShareholderSuccess, exportExcelShareholder, exportExcelShareholderError, exportExcelShareholderSuccess, exportPdfShareholder, exportPdfShareholderError, exportPdfShareholderSuccess, newShareholderError, newShareholderSuccess, shareholderListError, shareholderListSuccess, shareholderSeizureListError, shareholderSeizureListSuccess, shareholderWarrantyListError, shareholderWarrantyListSuccess, UpdateShareholderError, UpdateShareholderSuccess, UpdateStateShareholder } from '../../actions/shareholder.action';
import { deletUserError, deletUserSuccess } from '../../actions/user.action';

export interface shareholderState {
  msg?: string;
  isUser?: boolean;
  text?: string;
  state?: number;
  token?: string;
  error?: [];
  status?: number;
  shareholderList?: Shareholders[];
  shareholderSeizureList?: Shareholders[];
  shareholderWarrantyList?: Shareholders[];
}
export const shareholderInitialState: shareholderState = {
  isUser: (localStorage.getItem('isUser')) ? true : undefined,
  shareholderList: [],
  shareholderSeizureList: [],
  shareholderWarrantyList: []
}

export const shareholderReducer = createReducer(
  shareholderInitialState,
  on(newShareholderSuccess, (state, { msg, status }) => {
    return { ...state, msg, status }
  }),
  on(newShareholderError, (state, { msg, status }) => {
    return { ...state, msg, status }
  }),
  on(UpdateShareholderSuccess, (state, { msg, status }) => {
    return { msg: msg, status: status }
  }),
  on(UpdateShareholderError, (state, { msg, status }) => {
    return { ...state, msg, status }
  }),
  on(deletUserSuccess, (state, { msg, status }) => {
    return { ...state, msg, status }
  }),
  on(deletUserError, (state, { msg, status }) => {
    return { ...state, msg, status }
  }),
  on(UpdateStateShareholder, (state) => {
    return { status: null }
  }),
  on(shareholderListSuccess, (state, { shareholderList }) => {
    return { shareholderList: shareholderList }
  }),
  on(shareholderListError, (state, { msg, status }) => {
    return { ...state, msg, status }
  }),
  on(shareholderSeizureListSuccess, (state, { shareholderSeizureList }) => {
    
    return { shareholderSeizureList: shareholderSeizureList }
  }),
  on(shareholderSeizureListError, (state, { msg, status }) => {
    return { ...state, msg, status }
  }),
  on(shareholderWarrantyListSuccess, (state, { shareholderWarrantyList }) => {
    return { shareholderWarrantyList: shareholderWarrantyList }
  }),
  on(shareholderWarrantyListError, (state, { msg, status }) => {
    return { ...state, msg, status }
  }),
  on(exportExcelShareholder, (state) => state),
  on(exportExcelShareholderSuccess, (state, { payload }) => {
    const blob = new Blob([payload], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);

    // Cambiar el nombre del archivo
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth() + 1;
    const day = fechaActual.getDate();
    const hours = fechaActual.getHours();
    const minutes = fechaActual.getMinutes();
    const seconds = fechaActual.getSeconds();
    const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
    let fileName = "Accionistas " + fechaFormateada;

    // Crear enlace para descargar el archivo
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return state;
  }),
  on(exportExcelShareholderError, (state) => state),
  on(exportCsvShareholder, (state) => state),
  on(exportCsvShareholderSuccess, (state, { payload }) => {
    const csv = payload; // Contenido del archivo en formato csv
    // Crear el archivo blob
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    
    const url = window.URL.createObjectURL(blob);

    // Cambiar el nombre del archivo
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth() + 1;
    const day = fechaActual.getDate();
    const hours = fechaActual.getHours();
    const minutes = fechaActual.getMinutes();
    const seconds = fechaActual.getSeconds();
    const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
    let fileName = "Accionistas " + fechaFormateada + ".csv";

    // Crear enlace para descargar el archivo
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return state;
  }),
  on(exportCsvShareholderError, (state) => state),
  on(exportPdfShareholder, (state) => state),
  on(exportPdfShareholderSuccess, (state, { payload }) => {
    const csv = payload; // Contenido del archivo en formato csv
    // Crear el archivo blob
    const blob = new Blob([csv], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Cambiar el nombre del archivo
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth() + 1;
    const day = fechaActual.getDate();
    const hours = fechaActual.getHours();
    const minutes = fechaActual.getMinutes();
    const seconds = fechaActual.getSeconds();
    const fechaFormateada = `${year}_${month < 10 ? '0' : ''}${month}_${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}_${minutes < 10 ? '0' : ''}${minutes}_${seconds < 10 ? '0' : ''}${seconds}`;
    let fileName = "Accionistas " + fechaFormateada + ".pdf";

    // Crear enlace para descargar el archivo
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return state;
  }),
  on(exportPdfShareholderError, (state) => state)



)
