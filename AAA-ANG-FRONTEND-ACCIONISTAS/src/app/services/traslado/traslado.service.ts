import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TablaCargar } from "src/app/interfaces/shareholders.interface";
import { AsignarAccion } from "src/app/pages/traslados/traslados.component";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TrasladoService {
  constructor(private http: HttpClient,) { }

  getTranslatesList(tablaCargar: TablaCargar) {
    return this.http.get(environment.urlApi + 'getTransfersList?paginador=' + JSON.stringify(tablaCargar))
  }

  getTitlesListSelector() {
    return this.http.get(environment.urlApi + 'getTitlesSelectorList')
  }

  getIncompleteTitles() {
    return this.http.get(environment.urlApi + 'titlesPendingTransfers')
  }


  transferTitle(acciones: AsignarAccion[]) {
    return this.http.post(environment.urlApi + 'transferTitle', {
      DATA: acciones,
      EMAILADMIN: JSON.parse(localStorage.getItem('dataLogin')).email,
      ROLADMIN: JSON.parse(localStorage.getItem('dataLogin')).rol.rol
    })
  }

  deleteTranslate(ID_REGISTRO: string) {
    return this.http.delete(environment.urlApi + 'deleteTransferTitles', {
      body: {
        ID_REGISTRO,
        EMAILADMIN: JSON.parse(localStorage.getItem('dataLogin')).email,
        ROLADMIN: JSON.parse(localStorage.getItem('dataLogin')).rol.rol
      }
    })
  }

  editTransferTitle(acciones: AsignarAccion[]) {
    return this.http.put(environment.urlApi + 'updateTransferTitles', {
      DATA: acciones,
      EMAILADMIN: JSON.parse(localStorage.getItem('dataLogin')).email,
      ROLADMIN: JSON.parse(localStorage.getItem('dataLogin')).rol.rol
    })
  }

  exportExcel() {
    return this.http.get(environment.urlApi + 'exportExcelTraslados', { responseType: 'blob' });
  }

  exportCsv() {
    return this.http.get(environment.urlApi + 'exportCsvTraslados', { responseType: 'blob' });
  }

  exportPdf() {
    return this.http.get(environment.urlApi + 'exportPdfTraslados', { responseType: 'blob' });
  }
}
