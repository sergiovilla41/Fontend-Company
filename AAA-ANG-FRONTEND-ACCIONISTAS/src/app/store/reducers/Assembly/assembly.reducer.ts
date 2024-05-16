import { createReducer, on } from '@ngrx/store';
import { Shareholders } from 'src/app/model/shareholders.model';
import { exportExcelAssembly, exportExcelAssemblySuccess, exportExcelAssemblyError, exportCsvAssembly, exportCsvAssemblyError, exportCsvAssemblySuccess, exportPdfAssembly, exportPdfAssemblyError, exportPdfAssemblySuccess, assemblyListSuccess, assemblyListError } from '../../actions/assembly.action';
import { Assembly } from 'src/app/model/assembly.model';

export interface assemblyState {
    msg?: string;
    isUser?: boolean;
    text?: string;
    state?: number;
    token?: string;
    error?: [];
    status?: number;
    assemblyList?: Assembly[]

}
export const assemblyInitialState: assemblyState = {
    isUser: (localStorage.getItem('isUser')) ? true : undefined,
}

export const assemblyReducer = createReducer(
    assemblyInitialState,
    on(assemblyListSuccess, (state, { assemblyList }) => {
      return { assemblyList: assemblyList }
    }),
    on(assemblyListError, (state, { msg, status }) => {
      return { ...state, msg, status }
    }),
    on(exportExcelAssembly, (state) => state),
    on(exportExcelAssemblySuccess, (state, { payload }) => {
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
        let fileName = "Asambleas " + fechaFormateada;
        // Crear enlace para descargar el archivo
        const link = document.createElement('a');
        link.download = fileName;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return state;
    }),
    on(exportExcelAssemblyError, (state) => state),
    on(exportCsvAssembly, (state) => state),
    on(exportCsvAssemblySuccess, (state, { payload }) => {
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
      let fileName = "Asambleas " + fechaFormateada + ".csv";
      
      // Crear enlace para descargar el archivo
      const link = document.createElement('a');
      link.download = fileName;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return state;    
    }),
    on(exportCsvAssemblyError, (state) => state),
    on(exportPdfAssembly, (state) => state),
    on(exportPdfAssemblySuccess, (state, { payload }) => {
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
      let fileName = "Asambleas " + fechaFormateada + ".pdf";
      
      // Crear enlace para descargar el archivo
      const link = document.createElement('a');
      link.download = fileName;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return state;    
    }),
    on(exportPdfAssemblyError, (state) => state)



)
