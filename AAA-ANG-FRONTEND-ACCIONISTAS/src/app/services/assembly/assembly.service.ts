import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TablaCargar } from 'src/app/interfaces/shareholders.interface';
import { Assembly } from 'src/app/model/assembly.model';
import { Shareholders } from 'src/app/model/shareholders.model';
import { environment } from 'src/environments/environment.prod';

export let subject = new Subject<any>();

@Injectable({
  providedIn: 'root'
})
export class AssemblyService {

  private _refresh$ = new Subject<void>();
  private isAddAssemblyOpenSubject = new Subject<boolean>();
  private isEditAssemblyOpenSubject = new Subject<boolean>();
  private toEditAssembly = new BehaviorSubject<Shareholders>(JSON.parse(localStorage.getItem('toEditAssembly')));
  private assemblyListSubject = new Subject<any>();
  private tablaCargar: TablaCargar;

  constructor(private http: HttpClient) {}

  get refresh$() {
    return this._refresh$
  }

  getAssemblyListSubject(){
    return this.assemblyListSubject.asObservable()
  }

  getAssemblyList(paginador?: TablaCargar) {
    if(paginador){
      this.tablaCargar = paginador
    }
    const body = JSON.stringify(this.tablaCargar);
    this.http.get(environment.urlApi + 'assemblyList?paginador=' + body).subscribe(response => this.assemblyListSubject.next(response))
  }

  exportExcelAssembly(paginador: TablaCargar): Observable<any> {
    const body = JSON.stringify(paginador);
    const url = environment.urlApi + 'exportExcelAssembly?paginador=' + body;
    return this.http.get(url, { responseType: 'blob' });
  }

  exportCsvAssembly(paginador: TablaCargar): Observable<any> {
    const body = JSON.stringify(paginador);
    const url = environment.urlApi + 'exportCsvAssembly?paginador=' + body;
    return this.http.get(url, { responseType: 'blob' });
  }

  exportPdfAssembly(paginador: TablaCargar): Observable<any> {
    const body = JSON.stringify(paginador);
    const url = environment.urlApi + 'exportPdfAssembly?paginador=' + body;
    return this.http.get(url, { responseType: 'blob' });
  }

  getIsAddAssemblyOpen(): Observable<boolean> {
    return this.isAddAssemblyOpenSubject.asObservable()
  }

  getIsEditAssemblyOpen(): Observable<boolean>{
    return this.isEditAssemblyOpenSubject.asObservable()
  }

  setIsAddAssemblyOpen(isIt: boolean){
    localStorage.setItem('isEditAssemblyOpen', ''+false)
    this.isEditAssemblyOpenSubject.next(false)
    localStorage.setItem('isAddAssemblyOpen', ''+isIt)
    this.isAddAssemblyOpenSubject.next(isIt)
  }

  setIsEditAssemblyOpen(isIt: boolean){
    localStorage.setItem('isAddAssemblyOpen', ''+false)
    this.isAddAssemblyOpenSubject.next(false)
    localStorage.setItem('isEditAssemblyOpen', ''+isIt)
    this.isEditAssemblyOpenSubject.next(isIt)
  }

  loadIsAddAssemblyOpen(){
    this.isAddAssemblyOpenSubject.next(localStorage.getItem('isAddAssemblyOpen') === 'true')
  }

  loadIsEditAssemblyOpen(){
    this.isEditAssemblyOpenSubject.next(localStorage.getItem('isEditAssemblyOpen') === 'true')
  }

  getToEditAssembly(){
    return this.toEditAssembly.asObservable()
  }

  setToEditAssembly(assembly: Shareholders){
    localStorage.setItem('toEditAssembly', JSON.stringify(assembly))
    this.toEditAssembly.next(assembly)
  }

  addAssembly(assembly: any){
    return this.http.post(environment.urlApi + 'addAssembly', {...assembly, FECHA_ASAMBLEA: assembly.FECHA_ASAMBLEA.toLocaleDateString('es-CO')})
  }

  updateAssembly(assembly: any){
    return this.http.put(environment.urlApi + 'updateAssembly', {...assembly, FECHA_ASAMBLEA: assembly.FECHA_ASAMBLEA.toLocaleDateString('es-CO')})
  }

  getAssemblyTypeList(){
    return this.http.get(environment.urlApi + 'getTypeAssemblyList')
  }

  getAssemblySelect(): Observable<any> {
    return this.http.get(environment.urlApi+'getAssemblySelect')
  }


}
