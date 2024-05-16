import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Votacion } from "src/app/model/votacion.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { TablaCargar } from "src/app/interfaces/shareholders.interface";

@Injectable({
  providedIn: 'root'
})
export class EditAssemblyService {
  private activeAction: BehaviorSubject<string> = new BehaviorSubject(localStorage.getItem('activeAction'));
  private activeMenuItem = new BehaviorSubject<string>(localStorage.getItem('activeMenuItem'));
  private activeStep = new BehaviorSubject<string>(localStorage.getItem('activeStep'));
  private votacionSelected = new Subject<Votacion>();
  private votacionSelectedData: Votacion;
  private votacionEditing = new BehaviorSubject<Votacion>(JSON.parse(localStorage.getItem('votacionEditing')));
  private tipoVotacion = new BehaviorSubject<string>(localStorage.getItem('tipoVotacion'));
  private idVotacion = new BehaviorSubject<string>(localStorage.getItem('idVotacion'));

  constructor(private http: HttpClient) {
    this.votacionSelected.asObservable().subscribe(votacion => {
      this.votacionSelectedData = votacion;
    })

  }

  setIdVotacion(idVotacion: string){
    if(idVotacion){
      this.idVotacion.next(idVotacion)
      localStorage.setItem('idVotacion',idVotacion)
    }else{
      this.idVotacion.next(null);
      localStorage.removeItem('idVotacion')
    }
  }

  getIdVotacion(){
    return this.idVotacion.asObservable();
  }

  setActiveAction(action: string) {
    localStorage.setItem('activeAction', action);
    this.activeAction.next(action)
  }

  getActiveAction() {
    return this.activeAction.asObservable()
  }

  setActiveMenuItem(menuItem: string) {
    localStorage.setItem('activeMenuItem', menuItem)
    this.activeMenuItem.next(menuItem)
  }

  getActiveMenuItem() {
    return this.activeMenuItem.asObservable()
  }

  setActiveStep(step: string) {
    localStorage.setItem('activeStep', step)
    this.activeStep.next(step)
  }

  getActiveStep() {
    return this.activeStep.asObservable()
  }

  getVotacionEditing() {
    return this.votacionEditing.asObservable()
  }

  deleteVotacionEditing(){
    this.votacionEditing.next(null);
    localStorage.removeItem('votacionEditing')
  }

  saveVotacionSelected() {
    localStorage.setItem('votacionEditing', JSON.stringify(this.votacionSelectedData))
    this.votacionEditing.next(this.votacionSelectedData)
  }

  getVotacionSelected() {
    return this.votacionSelected.asObservable()
  }

  setVotacionSelected(votacion: Votacion) {
    this.votacionSelected.next(votacion)
  }

  getTipoVotacion(){
    return this.tipoVotacion.asObservable();
  }

  setTipoVotacion(tipoVotacion: string){
    localStorage.setItem('tipoVotacion', tipoVotacion);
    this.tipoVotacion.next(tipoVotacion)
  }

  exportExcel(ASAMBLEA_UUID: string,tablaCargar: TablaCargar) {
    const cargar = [...tablaCargar.filtro]
    cargar.push({columna: 'ASAMBLEA_UUID', valor: ASAMBLEA_UUID})
    return this.http.get(environment.urlApi + 'exportCsvBallot', { responseType: 'blob', params:{paginador: JSON.stringify({...tablaCargar, filtro: cargar})} });
  }

  exportCsv(ASAMBLEA_UUID: string,tablaCargar: TablaCargar) {
    const cargar = [...tablaCargar.filtro]
    cargar.push({columna: 'ASAMBLEA_UUID', valor: ASAMBLEA_UUID})
    return this.http.get(environment.urlApi + 'exportExcelBallot', { responseType: 'blob', params:{paginador: JSON.stringify({...tablaCargar, filtro: cargar})} });
  }

  exportPdf(ASAMBLEA_UUID: string,tablaCargar: TablaCargar) {
    const cargar = [...tablaCargar.filtro]
    cargar.push({columna: 'ASAMBLEA_UUID', valor: ASAMBLEA_UUID})
    return this.http.get(environment.urlApi + 'exportPdfBallot', { responseType: 'blob', params:{paginador: JSON.stringify({...tablaCargar, filtro: cargar})} });
  }


}
