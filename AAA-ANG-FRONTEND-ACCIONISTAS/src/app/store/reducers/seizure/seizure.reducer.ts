import { createReducer, on } from '@ngrx/store';
import { cancelTitleError, cancelTitleSuccess, cleanState, exportCsvTitle, exportCsvTitleError, exportCsvTitleSuccess, exportExcelTitle, exportExcelTitleError, exportExcelTitleSuccess, exportPdfTitle, exportPdfTitleError, exportPdfTitleSuccess, newTitleError, newTitleSuccess, titleListError, titleListSuccess, UpdateStateTitle } from '../../actions/title.action';
import { Titles } from 'src/app/model/titles.model';
import { UpdateStateSeizure, deleteSeizureError, deleteSeizureSuccess, newSeizureError, newSeizureSuccess, updateSeizureError, updateSeizureSuccess } from '../../actions/seizure.action';
import { Seizure } from 'src/app/model/seizure.model';

export interface seizureState {
    msg?: string;
    isUser?: boolean;
    text?: string;
    state?: number;
    token?: string;
    error?: [];
    status?: number;
    seizureList?: Seizure[];
}
export const seizureInitialState: seizureState = {
    isUser: (localStorage.getItem('isUser')) ? true : undefined
}

export const seizureReducer = createReducer(
  seizureInitialState,
    on(newSeizureSuccess, (state, { msg, status }) => {
        return { ...state, msg, status }
    }),
    on(newSeizureError, (state, { msg, status }) => {
        return { ...state, msg, status }
    }),
    on(updateSeizureSuccess, (state, { msg, status }) => {
        return { ...state, msg, status }
    }),
    on(updateSeizureError, (state, { msg, status }) => {
        return { ...state, msg, status }
    }),
    on(deleteSeizureSuccess, (state, { msg, status }) => {
        return { ...state, msg, status }
    }),
    on(deleteSeizureError, (state, { msg, status }) => {
        return { ...state, msg, status }
    }),
    on(UpdateStateSeizure, (state) => {
        return { status: null }
    }),
    on(titleListSuccess, (state, { titleList }) => {
      return {...state, titleList }
    }),
    on(titleListError, (state, { msg, status }) => {
      return { ...state, msg, status }
    }),
    on(exportExcelTitle, (state) => state),
    on(exportExcelTitleSuccess, (state, { payload }) => {
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
      let fileName = "Titulos " + fechaFormateada;

      // Crear enlace para descargar el archivo
      const link = document.createElement('a');
      link.download = fileName;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return state;
    }),
    on(exportExcelTitleError, (state) => state),
    on(exportCsvTitle, (state) => state),
    on(exportCsvTitleSuccess, (state, { payload }) => {
      const csv = payload; // Contenido del archivo en formato csv
      // Crear el archivo blob
      const blob = new Blob([csv], { type: 'text/csv' });
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
      let fileName = "Titulos " + fechaFormateada + ".csv";

      // Crear enlace para descargar el archivo
      const link = document.createElement('a');
      link.download = fileName;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return state;
    }),
    on(exportCsvTitleError, (state) => state),
    on(exportPdfTitle, (state) => state),
    on(exportPdfTitleSuccess, (state, { payload }) => {
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
      let fileName = "Titulos " + fechaFormateada + ".pdf";

      // Crear enlace para descargar el archivo
      const link = document.createElement('a');
      link.download = fileName;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return state;
    }),
    on(exportPdfTitleError, (state) => state),
    on(cleanState, (state) => ({...state, status: undefined}))

)
