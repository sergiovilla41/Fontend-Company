import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TablaCargar } from "src/app/interfaces/shareholders.interface";
import { EstadisticasVotacion, NuevaPregunta, OpcionRespuesta, Plancha, SaveAsistenteRespuesta, Votacion, VotacionType } from "src/app/model/votacion.model";
import { environment } from "src/environments/environment";



@Injectable({
  providedIn: 'root'
})

export class VotacionService {
  constructor(private http: HttpClient) { }

  getVotacionTypes() {
    return this.http.get<VotacionType[]>(environment.urlApi + 'getBallotType');
  }

  getVotacionList(tablaCargar: TablaCargar, ASAMBLEA_UUID: string) {
    const cargar = [...tablaCargar.filtro]
    cargar.push({ columna: 'ASAMBLEA_UUID', valor: ASAMBLEA_UUID })
    return this.http.get<{ rows: Votacion[], count: number }>(environment.urlApi + 'getBallotList', {
      params: {
        paginador: JSON.stringify({ ...tablaCargar, filtro: cargar })
      }
    })
  }

  postPregunta(nuevaPregunta: NuevaPregunta) {
    return this.http.post(environment.urlApi + 'createBallot', {
      ...nuevaPregunta,
      EMAILADMIN: JSON.parse(localStorage.getItem('dataLogin')).email,
      ROLADMIN: JSON.parse(localStorage.getItem('dataLogin')).rol.rol
    });
  }

  editarPregunta(nuevaPregunta: NuevaPregunta) {

    return this.http.put(environment.urlApi + 'updateAssembly', {
      ...nuevaPregunta,
      EMAILADMIN: JSON.parse(localStorage.getItem('dataLogin')).email,
      ROLADMIN: JSON.parse(localStorage.getItem('dataLogin')).rol.rol
    });
  }

  getOpcionRespuestaList(VOTACION_UUID: string) {
    return this.http.get<{ rows: OpcionRespuesta[] }>(environment.urlApi + 'getCandidateQuestion', {
      params: { 'VOTACION_UUID': VOTACION_UUID }
    });
  }

  agregarRespuesta(respuesta: string, votacionUUID: string) {
    return this.http.post(environment.urlApi + 'createCandidate', {
      DATA: [{
        "VOTACION_UUID": votacionUUID,
        "NOMBRE_COMPLETO": respuesta,
        "ES_VALIDO": 1
      }],
      EMAILADMIN: JSON.parse(localStorage.getItem('dataLogin')).email,
      ROLADMIN: JSON.parse(localStorage.getItem('dataLogin')).rol.rol
    });
  }

  saveRespuestas(respuestas: OpcionRespuesta[]) {
    return this.http.put(environment.urlApi + 'updateStateCandidate', {
      DATA: respuestas.map(respuesta => ({ CANDIDATO_UUID: respuesta.ID_REGISTRO, ESTADO: respuesta.ESTADO })),
      EMAILADMIN: JSON.parse(localStorage.getItem('dataLogin')).email,
      ROLADMIN: JSON.parse(localStorage.getItem('dataLogin')).rol.rol
    });
  }

  getEstadisticasVotacion(idAsamblea: string) {
    return this.http.get<{ rows: EstadisticasVotacion[] }>(environment.urlApi + 'getDataCloseAssembly', {
      params: {
        ASAMBLEA_UUID: idAsamblea
      }
    });
  }

  saveAsistentesRespuestas(saveAsistenteRespuestas: SaveAsistenteRespuesta[]) {
    return this.http.post(environment.urlApi + 'createsBallotAttendee', {
      DATA: saveAsistenteRespuestas,
      EMAILADMIN: JSON.parse(localStorage.getItem('dataLogin')).email,
      ROLADMIN: JSON.parse(localStorage.getItem('dataLogin')).rol.rol
    })
  }

  cerrarVotacion(idVotacion: string) {
    return this.http.put(environment.urlApi + 'closeBallot', {
      VOTACION_UUID: idVotacion,
      EMAILADMIN: JSON.parse(localStorage.getItem('dataLogin')).email,
      ROLADMIN: JSON.parse(localStorage.getItem('dataLogin')).rol.rol
    })
  }

  getCandidateQuestionPlate(VOTACION_UUID: string) {
    return this.http.get<Plancha[]>(environment.urlApi + 'getCandidateQuestionPlate', {
      params: {
        VOTACION_UUID
      }
    })
  }

  createCandidatePresidentBallot(planchas: {respuesta: string, tipo?: string, personas?: {name: string}[]}[], VOTACION_UUID: string){
    return this.http.post(environment.urlApi + 'createCandidatePresidentBallot', {
      DATA: planchas.map(p => ({
        VOTACION_UUID,
        PLANCHA: p.respuesta,
        ES_VALIDO: 1,
        NOMBRES: p.personas?.map(s => s.name)
      })),
      EMAILADMIN: JSON.parse(localStorage.getItem('dataLogin')).email,
      ROLADMIN: JSON.parse(localStorage.getItem('dataLogin')).rol.rol
    })
  }

}
