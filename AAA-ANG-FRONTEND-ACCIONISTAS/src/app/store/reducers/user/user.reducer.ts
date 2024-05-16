import { createReducer, on } from '@ngrx/store';
import { deletUserError, deletUserSuccess, exportCsvUsers, exportCsvUsersError, exportCsvUsersSuccess, exportExcelUsers, exportExcelUsersError, exportExcelUsersSuccess, exportPdfUsers, exportPdfUsersError, exportPdfUsersSuccess, logout, newUserError, newUserSuccess, UpdateState, UpdateUserError, UpdateUserSuccess, validateUser, validateUserError, validateUserSuccess } from '../../actions/user.action';

export interface UserState {
  msg?: string;
  isUser?: boolean;
  text?: string;
  state?: number;
  token?: string;
  error?: [];
  status?: number;
}
export const userInitialState: UserState = {
  isUser: (localStorage.getItem('isUser')) ? true : undefined
}

export const userReducer = createReducer(
  userInitialState,
  on(validateUserSuccess, (state, { isUser, dataLogin }) => {
    if (isUser)
      localStorage.setItem('isUser', 'true');
    let Jsondata = JSON.stringify(dataLogin)
    let JsonLogin = JSON.parse(Jsondata);
    let dataLoginStorage = {
      rol: JsonLogin.rol,
      email: JsonLogin.email,
      nombre: JsonLogin.nombre
    }
    localStorage.setItem('dataLogin', JSON.stringify(dataLoginStorage));
    localStorage.setItem('token', JSON.stringify(JsonLogin.token));
    return { isUser, dataLogin }
  }),
  on(logout, (state) => {
    localStorage.clear();
    return { ...state, isUser: undefined };
  }),
  on(validateUserError, (state, { text, status }) => {
    return { text, status, isUser: false }
  }),
  on(validateUser, (state) => ({
    isUser: state.isUser
  })),
  on(newUserSuccess, (state, { msg, status }) => {
    return { ...state, msg, status }
  }),
  on(newUserError, (state, { msg, status }) => {
    return { ...state, msg, status }
  }),
  on(UpdateUserSuccess, (state, { msg, status }) => {
    return { msg: msg, status: status }
  }),
  on(UpdateUserError, (state, { msg, status }) => {
    return { ...state, msg, status }
  }),
  on(deletUserSuccess, (state, { msg, status }) => {
    return { ...state, msg, status }
  }),
  on(deletUserError, (state, { msg, status }) => {
    return { ...state, msg, status }
  }),
  on(UpdateState, (state) => {
    return { status: null }
  }),
  on(exportExcelUsers, (state) => state),
  on(exportExcelUsersSuccess, (state, { payload }) => {
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
    let fileName = "Usuarios " + fechaFormateada;

    // Crear enlace para descargar el archivo
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return state;
  }),
  on(exportExcelUsersError, (state) => state),
  on(exportCsvUsers, (state) => state),
  on(exportCsvUsersSuccess, (state, { payload }) => {
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
    let fileName = "Usuarios " + fechaFormateada + ".csv";
    
    // Crear enlace para descargar el archivo
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return state;    
  }),
  on(exportCsvUsersError, (state) => state),
  on(exportPdfUsers, (state) => state),
  on(exportPdfUsersSuccess, (state, { payload }) => {
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
    let fileName = "Usuarios " + fechaFormateada + ".pdf";
    
    // Crear enlace para descargar el archivo
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return state;    
  }),
  on(exportPdfUsersError, (state) => state)


)
