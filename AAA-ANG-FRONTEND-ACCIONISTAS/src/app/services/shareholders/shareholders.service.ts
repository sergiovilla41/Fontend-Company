import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TablaCargar, TipoOrder } from 'src/app/interfaces/shareholders.interface';
import { Shareholders } from 'src/app/model/shareholders.model';
import { environment } from 'src/environments/environment';

export let subject = new Subject<any>();

@Injectable({
  providedIn: 'root'
})
export class ShareholdersService {

  private _refresh$ = new Subject<void>();
  private _shareholders = new Subject<any>();
  private _paginador = new Subject<TablaCargar>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  fetchShareholdersList(): void {
    let entro = false;
    this._paginador.asObservable().subscribe(value => {

      entro = true;
      const body = JSON.stringify(value);
      this.http.get(environment.urlApi+'shareholdersList?paginador=' + body).subscribe(res => this._shareholders.next(res));
    })

    if (!entro) {
      const body = JSON.stringify({
        first: 0,
        rows: 50,
        orderCampo: undefined,
        tipoOrder: TipoOrder.ASC
      });
      this.http.get(environment.urlApi+'shareholdersList?paginador=' + body).subscribe(res => this._shareholders.next(res));
    }
  }

  setPaginador(paginador: TablaCargar): void {
    this._paginador.next(paginador);
  }

  getShareholdersList(): Observable<any> {
    return this._shareholders.asObservable()
  }


  newShareholder(shareholder: Shareholders): Observable<any> {
    const body = JSON.stringify(shareholder);
    return this.http.post(environment.urlApi+'addShareholders', body);
  }

  updateShareholder(shareholder: Shareholders): Observable<any> {
    const body = JSON.stringify(shareholder);
    return this.http.put(environment.urlApi+'updateShareholders', body);
  }

  getShareholder(idShareholder: string): Observable<any> {
    return this.http.get(environment.urlApi+'getShareholder?idShareholder=' + idShareholder);
  }

  getShareholderSelect(): Observable<any> {
    return this.http.get(environment.urlApi+'getShareholderSelect')
  }

  getShareholderSeizureSelect(): Observable<any> {
    return this.http.get(environment.urlApi+'getShareholderSeizureSelect')
  }

  getShareholderWarrantySelect(): Observable<any> {
    return this.http.get(environment.urlApi+'getShareholderWarrantySelect')
  }

  exportExcelShareholder(paginador: TablaCargar): Observable<any> {
    const body = JSON.stringify(paginador);
    const url = environment.urlApi+'exportExcelShareholder?paginador=' + body;
    return this.http.get(url, { responseType: 'blob' });
  }

  exportCsvShareholder(paginador: TablaCargar): Observable<any> {
    const body = JSON.stringify(paginador);
    const url = environment.urlApi+'exportCsvShareholder?paginador=' + body;
    return this.http.get(url, { responseType: 'blob' });
  }

  exportPdfShareholder(paginador: TablaCargar): Observable<any> {
    const body = JSON.stringify(paginador);
    const url = environment.urlApi+'exportPdfShareholder?paginador=' + body;
    return this.http.get(url, { responseType: 'blob' });
  }

}
