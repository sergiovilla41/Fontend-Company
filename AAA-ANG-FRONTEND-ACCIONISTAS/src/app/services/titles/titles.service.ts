import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TablaCargar, TipoOrder } from 'src/app/interfaces/shareholders.interface';
import { CancelTitles } from 'src/app/model/cancelTitles.model';
import { Titles } from 'src/app/model/titles.model';
import { EditTitles } from 'src/app/model/editTitles.model';
import { DeleteTitles } from 'src/app/model/deleteTitles.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TitlesService {

  private _refresh$ = new Subject<void>();
  private titleList = new Subject<any>()
  private paginador = new BehaviorSubject<TablaCargar>({
    first: 0,
    rows: 50,
    orderCampo: undefined,
    tipoOrder: TipoOrder.ASC,
  })
  private paginadorData: TablaCargar;

  constructor(private http: HttpClient) {
    this.paginador.asObservable().subscribe(value => this.paginadorData = value)
  }

  get refresh$() {
    return this._refresh$;
  }


  loadTitlesList(): void {
    const body = JSON.stringify(this.paginadorData);
    this.http.get(environment.urlApi + 'titleList?paginador=' + body).subscribe(value => this.titleList.next(value));
  }

  getTitlesList(){
    return this.titleList.asObservable()
  }

  getPaginador(){
    return this.paginador.asObservable()
  }

  setPaginador(paginador: TablaCargar){
    this.paginador.next(paginador)
  }

  getTitlesSelect(): Observable<any> {
    return this.http.get(environment.urlApi+'getTitlesSelectorList')
  }

  getTitlesSeizuireSelect(): Observable<any> {
    return this.http.get(environment.urlApi+'getTitlesSeizureSelectorList')
  }

  newTitle(title: Titles): Observable<any> {
    const body = JSON.stringify(title);
    return this.http.post(environment.urlApi+'addTitle', body);
  }

  cancelTitle(cancelTitles: CancelTitles): Observable<any> {
    const body = JSON.stringify(cancelTitles);
    return this.http.post(environment.urlApi+'cancelTitle', body);
  }

  editTitle(editTitle: EditTitles): Observable<any> {
    const body = JSON.stringify(editTitle);
    return this.http.put(environment.urlApi + 'updateTitle', body);
  }

  deleteTitle(deleteTitle: DeleteTitles): Observable<any> {
    const body = JSON.stringify(deleteTitle);
    return this.http.delete(environment.urlApi + 'deleteTitle', { body });
  }

  exportExcelTitle(paginador: TablaCargar): Observable<any> {
    const body = JSON.stringify(paginador);
    const url = environment.urlApi+'exportExcelTitle?paginador=' + body;
    return this.http.get(url, { responseType: 'blob' });
  }

  exportCsvTitle(paginador: TablaCargar): Observable<any> {
    const body = JSON.stringify(paginador);
    const url = environment.urlApi+'exportCsvTitle?paginador=' + body;
    return this.http.get(url, { responseType: 'blob' });
  }

  exportPdfTitle(paginador: TablaCargar): Observable<any> {
    const body = JSON.stringify(paginador);
    const url = environment.urlApi+'exportPdfTitle?paginador=' + body;
    return this.http.get(url, { responseType: 'blob' });
  }


  // lista selector reportes titulos

  getTitlteShareholder(titulo_uuid: string): Observable<any> {
    return this.http.get(environment.urlApi+'titleShareholder?ID_REGISTRO='+ titulo_uuid)
 }


}
