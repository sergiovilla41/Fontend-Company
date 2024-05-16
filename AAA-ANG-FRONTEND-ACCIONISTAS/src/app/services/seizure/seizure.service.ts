import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TablaCargar, TipoOrder } from 'src/app/interfaces/shareholders.interface';
import { Seizure } from 'src/app/model/seizure.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SeizureService {


  private _refresh$ = new Subject<void>();
  private _paginador = new Subject<TablaCargar>();
  private _seizure = new Subject<any>();
  private isAddSeizureOpenSubject = new Subject<boolean>()
  private isEditSeizureOpenSubject = new Subject<boolean>()
  private toEditSeizure = new Subject<Seizure>()

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$
  }

  fetchSeizureList(): void {
    let entro = false;
    this._paginador.asObservable().subscribe(value => {
      entro = true;
      const body = JSON.stringify(value);
      return this.http.get(environment.urlApi + 'getSeizureList?paginador=' + body).subscribe(res => this._seizure.next(res));
    })

    if (!entro) {
      const body = JSON.stringify({
        first: 0,
        rows: 50,
        orderCampo: undefined,
        tipoOrder: TipoOrder.ASC
      });
      this.http.get(environment.urlApi + 'getSeizureList?paginador=' + body).subscribe(res => this._seizure.next(res));
    }
  }

  setPaginador(paginador: TablaCargar): void {
    this._paginador.next(paginador);
  }

  getSeizureList(paginador: TablaCargar): Observable<any> {
    return this._seizure.asObservable();
  }

  getSeizure(idSeizure: string): Observable<any> {
    return this.http.get(environment.urlApi + 'getSeizure?idSeizure=' + idSeizure);
  }

  newSeizure(seizure: Seizure): Observable<any> {
    const body = JSON.stringify(seizure);
    return this.http.post(environment.urlApi + 'addSeizure', body);
  }

  updateSeizure(seizure: Seizure): Observable<any> {
    const body = JSON.stringify(seizure);
    return this.http.put(environment.urlApi + 'updateSeizure', body);
  }

  deleteSeizure(seizure: Seizure) {
    const body = JSON.stringify(seizure);
    return this.http.delete(environment.urlApi + 'deleteSeizure', { body })
  }

  exportExcel() {
    return this.http.get(environment.urlApi + 'exportExcelEmbargos', { responseType: 'blob' });
  }

  exportCsv() {
    return this.http.get(environment.urlApi + 'exportCsvEmbargos', { responseType: 'blob' });
  }

  exportPdf() {
    return this.http.get(environment.urlApi + 'exportPdfEmbargos', { responseType: 'blob' });
  }


}
