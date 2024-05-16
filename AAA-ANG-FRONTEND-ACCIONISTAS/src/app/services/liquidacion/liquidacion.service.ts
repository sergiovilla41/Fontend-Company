import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TablaCargar } from "src/app/interfaces/shareholders.interface";
import { Liquidacion } from "src/app/model/liquidacion.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LiquidacionService {
  constructor(private http: HttpClient) { }

  getLiquidacionList(tablaCargar: TablaCargar, ASAMBLEA_UUID: string): Observable<{ rows: Liquidacion[], count: number }> {
    const cargar = [...tablaCargar.filtro]
    cargar.push({ columna: 'ASAMBLEA_UUID', valor: ASAMBLEA_UUID })
    return this.http.get<{ rows: Liquidacion[], count: number }>(environment.urlApi + 'getsettlementList?paginador=' + JSON.stringify({ ...tablaCargar, filtro: cargar }))
  }

  liquidarMasivamente(ASAMBLEA_UUID: string, TIPO_ACCIONISTA: number) {
    return this.http.post<{ status: number, msg: string }>(environment.urlApi + 'massiveSettlementTitles', {
      ASAMBLEA_UUID,
      TIPO_ACCIONISTA,
      EMAILADMIN: JSON.parse(localStorage.getItem('dataLogin')).email,
      ROLADMIN: JSON.parse(localStorage.getItem('dataLogin')).rol.rol
    })
  }

  liquidarPorAccionista(TITULO_UUID: string, ASAMBLEA_UUID: string, CUOTAS: number) {
    return this.http.post<{ status: number, msg: string }>(environment.urlApi + 'settlementTitle', {
      TITULO_UUID, ASAMBLEA_UUID, CUOTAS,
      EMAILADMIN: JSON.parse(localStorage.getItem('dataLogin')).email,
      ROLADMIN: JSON.parse(localStorage.getItem('dataLogin')).rol.rol
    })
  }

  getLiquidacionEstados() {
    return this.http.get(environment.urlApi + 'getStateSettlementType')
  }

  editarLiquidacion(ID_REGISTRO: string, ESTADO_UUID: string) {
    return this.http.put<{ status: number, msg: string }>(environment.urlApi + 'updateStateSettlement', {
      ID_REGISTRO, ESTADO_UUID,
      EMAILADMIN: JSON.parse(localStorage.getItem('dataLogin')).email,
      ROLADMIN: JSON.parse(localStorage.getItem('dataLogin')).rol.rol
    })
  }
}
