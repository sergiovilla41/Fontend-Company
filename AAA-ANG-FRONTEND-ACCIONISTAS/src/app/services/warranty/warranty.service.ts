import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError } from 'rxjs';
import { TablaCargar, TipoOrder } from 'src/app/interfaces/shareholders.interface';
import { Warranty } from 'src/app/model/warranty.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarrantyService {

  private _refresh$ = new Subject<void>();
  private _paginador = new Subject<TablaCargar>();
  private _warranty = new Subject<any>();
  private isAddWarrantyOpenSubject = new Subject<boolean>()
  private isEditWarrantyOpenSubject = new Subject<boolean>()
  private toEditWarranty = new Subject<Warranty>()

  constructor(private http: HttpClient) {}

  get refresh$() {
    return this._refresh$
  }

  fetchWarrantyList(): void {
    let entro = false;
    this._paginador.asObservable().subscribe(value => {
      entro = true;
      const body = JSON.stringify(value);
      return this.http.get(environment.urlApi+'getWarrantyList?paginador=' + body).subscribe(res => this._warranty.next(res));
    })

    if (!entro) {
      const body = JSON.stringify({
        first: 0,
        rows: 50,
        orderCampo: undefined,
        tipoOrder: TipoOrder.ASC
      });
      this.http.get(environment.urlApi+'getWarrantyList?paginador=' + body).subscribe(res => this._warranty.next(res));
    }
  }

  setPaginador(paginador: TablaCargar): void {
    this._paginador.next(paginador);
  }

  getWarrantyList(paginador: TablaCargar): Observable<any> {
    return this._warranty.asObservable();
  }

  getWarraty(idWarranty: string): Observable<any> {
    return this.http.get(environment.urlApi+'getWarranty?idWarranty=' + idWarranty);
  }

  newWarranty(warranty: Warranty): Observable<any> {
    const body = JSON.stringify(warranty);
    return this.http.post(environment.urlApi+'addWarranty', body);
  }

  updateWarranty(warranty: Warranty): Observable<any> {
    const body = JSON.stringify(warranty);
    return this.http.put(environment.urlApi+'updateWarranty', body);
  }

  deleteWarranty(warranty: Warranty) {
    const body = JSON.stringify(warranty);
    return this.http.delete(environment.urlApi+'deleteWarranty', {body})
  }

  exportExcel() {
    return this.http.get('http://localhost:3000/api/exportExcelGarantias', { responseType: 'blob' });
  }

  exportCsv() {
    return this.http.get('http://localhost:3000/api/exportCsvGarantias', { responseType: 'blob' }).pipe();
  }

  exportPdf() {
    return this.http.get('http://localhost:3000/api/exportPdfGarantias', { responseType: 'blob' });
  }

}
