import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TablaCargar } from "src/app/interfaces/shareholders.interface";
import { Asistencia, TypeAsistent } from "src/app/model/asistencia.model";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  constructor(private http: HttpClient) { }

  getAsistencias(ASAMBLEA_UUID: string, tablaCargar: TablaCargar) {
    const cargar = [...tablaCargar.filtro]
    cargar.push({ columna: 'ASAMBLEA_UUID', valor: ASAMBLEA_UUID })

    return this.http.get<{ count: number, rows: Asistencia[] }>(environment.urlApi + 'getAssistantList', {
      params: {
        paginador: JSON.stringify({ ...tablaCargar, filtro: cargar }),
      }
    });
  }

  getTypeAsistantList() {
    return this.http.get<TypeAsistent[]>(environment.urlApi + 'getTypeAssistantList')
  }

  postAsistencia(asistencia: {
    ASAMBLEA_UUID: string,
    ACCIONISTA_UUID: string,
    TIPO_ASISTENTE_UUID: string,
    NOMBRE_COMPLETO: string,
    TIPO_DOCUMENTO: string,
    IDENTIFICACION: number
  }) {
    return this.http.post(environment.urlApi + 'addRegisterAssistant', JSON.stringify({
      ...asistencia, EMAILADMIN: JSON.parse(localStorage.getItem('dataLogin')).email,
      ROLADMIN: JSON.parse(localStorage.getItem('dataLogin')).rol.rol
    }))
  }

  saveAsistencia(asistencias: Asistencia[]) {
    return this.http.put(environment.urlApi + 'updateStateAssistant', {
      DATA: asistencias.map(el => ({ ASISTENTE_UUID: el.ASISTENTE_UUID, ESTADO: el.ACTIVO })),
      EMAILADMIN: JSON.parse(localStorage.getItem('dataLogin')).email,
      ROLADMIN: JSON.parse(localStorage.getItem('dataLogin')).rol.rol
    })
  }

  getDataCloseAssembly(ASAMBLEA_UUID: string) {
    return this.http.get<{
      DESCRIPCION: string
    }[]
    >(environment.urlApi + 'getBallotCloseAssemblyList', {
      params: {
        ASAMBLEA_UUID
      }
    })
  }
}
