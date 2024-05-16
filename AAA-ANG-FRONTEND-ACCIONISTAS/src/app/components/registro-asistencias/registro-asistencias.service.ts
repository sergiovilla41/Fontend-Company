import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { TablaCargar } from "src/app/interfaces/shareholders.interface";

@Injectable({
  providedIn: 'root'
})
export class RegistroAsistenciasService{
  private isNewOpen = new BehaviorSubject<boolean>(localStorage.getItem('isNewOpenRegistroAsistencia') === 'true');
  constructor(private http: HttpClient,) { }

  setIsNewOpen(isIt: boolean){
    if(isIt){
      localStorage.setItem('isNewOpenRegistroAsistencia', JSON.stringify(isIt))
    }else{
      localStorage.removeItem('isNewOpenRegistroAsistencia')
    }
    this.isNewOpen.next(isIt);
  }

  getIsNewOpen(){
    return this.isNewOpen.asObservable()
  }


  exportExcel(ASAMBLEA_UUID: string,tablaCargar: TablaCargar) {
    const cargar = [...tablaCargar.filtro]
    cargar.push({columna: 'ASAMBLEA_UUID', valor: ASAMBLEA_UUID})
    return this.http.get(environment.urlApi + 'exportExcelAssistant', { responseType: 'blob', params:{paginador: JSON.stringify({...tablaCargar, filtro: cargar})} });
  }

  exportCsv(ASAMBLEA_UUID: string,tablaCargar: TablaCargar) {
    const cargar = [...tablaCargar.filtro]
    cargar.push({columna: 'ASAMBLEA_UUID', valor: ASAMBLEA_UUID})
    return this.http.get(environment.urlApi + 'exportCsvAssistant', { responseType: 'blob', params:{paginador: JSON.stringify({...tablaCargar, filtro: cargar})}});
  }

  exportPdf(ASAMBLEA_UUID: string,tablaCargar: TablaCargar) {
    const cargar = [...tablaCargar.filtro]
    cargar.push({columna: 'ASAMBLEA_UUID', valor: ASAMBLEA_UUID})
    return this.http.get(environment.urlApi + 'exportPdfAssistant', { responseType: 'blob', params:{paginador: JSON.stringify({...tablaCargar, filtro: cargar})} });
  }




}
