import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Liquidacion } from "src/app/model/liquidacion.model";
import { TablaCargar } from "src/app/interfaces/shareholders.interface";

@Injectable({
  providedIn: 'root'
})
export class LiquidacionBehaviorService{
  private action = new BehaviorSubject<string>(localStorage.getItem('liquidacionAction'));
  constructor(private http: HttpClient,) { }
  private selectedLiquidacion = new BehaviorSubject<Liquidacion>(JSON.parse(localStorage.getItem('selectedLiquidacion')))

  getAction(){
    return this.action.asObservable()
  }

  setAction(newAction: string){
    if(newAction){
      localStorage.setItem('liquidacionAction', newAction)
      this.action.next(newAction)
    }else{
      localStorage.removeItem('liquidacionAction')
      this.action.next(newAction)
    }
  }

  exportExcel(ASAMBLEA_UUID: string,tablaCargar: TablaCargar) {
    const cargar = [...tablaCargar.filtro]
    cargar.push({columna: 'ASAMBLEA_UUID', valor: ASAMBLEA_UUID})
    return this.http.get(environment.urlApi + 'exportExcelSettlement', { responseType: 'blob', params:{paginador: JSON.stringify({...tablaCargar, filtro: cargar})} });
  }

  exportCsv(ASAMBLEA_UUID: string,tablaCargar: TablaCargar) {
    const cargar = [...tablaCargar.filtro]
    cargar.push({columna: 'ASAMBLEA_UUID', valor: ASAMBLEA_UUID})
    return this.http.get(environment.urlApi + 'exportCsvSettlement', { responseType: 'blob', params:{paginador: JSON.stringify({...tablaCargar, filtro: cargar})} });
  }

  exportPdf(ASAMBLEA_UUID: string,tablaCargar: TablaCargar) {
    const cargar = [...tablaCargar.filtro]
    cargar.push({columna: 'ASAMBLEA_UUID', valor: ASAMBLEA_UUID})
    return this.http.get(environment.urlApi + 'exportPdfSettlement', { responseType: 'blob', params:{paginador: JSON.stringify({...tablaCargar, filtro: cargar})} });
  }


  getSelectedLiquidacion(){
    return this.selectedLiquidacion.asObservable();
  }

  setSelectedLiquidacion(liquidacion: Liquidacion){
    if(liquidacion){
      localStorage.setItem('selectedLiquidacion', JSON.stringify(liquidacion))
    }else{
      localStorage.removeItem('selectedLiquidacion')
    }
    this.selectedLiquidacion.next(liquidacion)
  }
}
