import { Injectable } from '@angular/core';
import { TablaCargar, TipoOrder } from 'src/app/interfaces/shareholders.interface';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private _refresh$ = new Subject<void>();
  private _paginador = new Subject<TablaCargar>();
  private _comptrollerShareholder = new Subject<any>();
  private _paginadorSubscription: Subscription | undefined;
  private pag: TablaCargar;


  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$
  }

  get paginador$() {
    return this._paginador.asObservable();
  }

  setPaginador(paginador: TablaCargar): void {
    this.pag = paginador
    this._paginador.next(paginador);
  }

  // reporte composicion accionaria

  fetchComptrollerShareholderList(): void {
    let entro = false;

    this._paginadorSubscription = this._paginador.asObservable().subscribe(value => {
      entro = true;
      const body = JSON.stringify(value);
      return this.http.get(environment.urlApi + 'listComptrollerReporting?paginador=' + body).subscribe(res => this._comptrollerShareholder.next(res));
    })

    if (!entro) {
      /* const body = JSON.stringify({
        first: 0,
        rows: 50,
        orderCampo: undefined,
        tipoOrder: TipoOrder.ASC
      }); */
      const body = JSON.stringify(this.pag);
      this.http.get(environment.urlApi + 'listComptrollerReporting?paginador=' + body).subscribe(res => this._comptrollerShareholder.next(res));
    }

    this.unsubscribePaginador()

  }

  getComptrollerShareholderList(paginador: TablaCargar): Observable<any> {
    return this._comptrollerShareholder.asObservable();
  }

  unsubscribePaginador(): void {
    if (this._paginadorSubscription) {
      this._paginadorSubscription.unsubscribe();
    }
  }

  exportExcelComptrollerShareholder(paginador: TablaCargar): Observable<any> {
    const body = JSON.stringify(paginador);
    const url = environment.urlApi + 'exportExcelComptrollerReporting?paginador=' + body;
    return this.http.get(url, { responseType: 'blob' });
  }

  exportCsvComptrollerShareholder(paginador: TablaCargar): Observable<any> {
    const body = JSON.stringify(paginador);
    const url = environment.urlApi + 'exportCsvComptrollerReporting?paginador=' + body;
    return this.http.get(url, { responseType: 'blob' });
  }

  exportPdfComptrollerShareholder(paginador: TablaCargar): Observable<any> {
    const body = JSON.stringify(paginador);
    const url = environment.urlApi + 'exportPdfComptrollerReporting?paginador=' + body;
    return this.http.get(url, { responseType: 'blob' });
  }

  // reporte libro de accionistas
  /*   exportPdfShareholderBook(paginador: TablaCargar): Observable<any> {
      const body = JSON.stringify(paginador);
      const url = environment.urlApi+'exportPdfShareholdersBook?paginador=' + body;
      return this.http.get(url, { responseType: 'blob' });
    } */
  exportPdfShareholderBook(): Observable<any> {
    const url = environment.urlApi + 'exportPdfShareholdersBook';
    return this.http.get(url, { responseType: 'blob' });
  }


  // informe super sociedades
  exportPdfSuperSocieties(): Observable<any> {
    const url = environment.urlApi + 'exportPdfSuperSocietiesReport';
    return this.http.get(url, { responseType: 'blob' });
  }


  // reporte dian
  exportPdfReportDian(): Observable<any> {
    const url = environment.urlApi + 'exportPdfReportDian';
    return this.http.get(url, { responseType: 'blob' });
  }


  // reporte de votaciones
  exportPdfBallot(id_registro: String): Observable<any> {
    const body = JSON.stringify(id_registro);
    const url = environment.urlApi + 'exportPdfBallot?ID_REGISTRO=' + body;
    return this.http.get(url, { responseType: 'blob' });
  }


  // impresion de tarjetones
  exportPdfPrintingCards(id_registro: String): Observable<any> {
    const body = JSON.stringify(id_registro);
    const url = environment.urlApi + 'exportPdfPrintingCards?ID_REGISTRO=' + body;
    return this.http.get(url, { responseType: 'blob' });
  }


  // registro libro de accionistas

  exportExcelShareholderLedgerRegister(anio: number): Observable<any> {
    const body = JSON.stringify(anio);
    const url = environment.urlApi + 'exportExcelShareholderLedgerRegister?ANIO=' + body;
    return this.http.get(url, { responseType: 'blob' });
  }


  // certificado de accionistas

  exportPdfShareholderCertificate(id_registro: string, atn: string, fecha_capital: string, fecha_intrinseco: string, valor_intrinseco: number): Observable<any> {
    const url = environment.urlApi + 'exportPdfShareholderCertificate?ID_REGISTRO=' + id_registro
      + '&ATN=' + encodeURIComponent(atn)
      + '&FECHA_CAPITAL=' + encodeURIComponent(fecha_capital)
      + '&FECHA_INTRINSECO=' + encodeURIComponent(fecha_intrinseco)
      + '&VALOR_INTRINSECO=' + valor_intrinseco;

    return this.http.get(url, { responseType: 'blob' });
  }


  // Reporte embargos por accionista
  exportPdfSeizureShareholder(id_registro: String): Observable<any> {
    const url = environment.urlApi + 'exportPdfseizureShareholder?ID_REGISTRO=' + id_registro;
    return this.http.get(url, { responseType: 'blob' });
  }


  // Reporte garantias por accionista
  exportPdfWarrantyShareholder(id_registro: String): Observable<any> {
    const url = environment.urlApi + 'exportPdfWarrantyShareholder?ID_REGISTRO=' + id_registro;
    return this.http.get(url, { responseType: 'blob' });
  }


  // Imprimir titulo
  exportPdfTitleShareholder(acionista_uuid: string, titulo_uuid: string): Observable<any> {
    const url = environment.urlApi + 'exportPdfTitlesShareholder?ACCIONISTA_UUID=' + acionista_uuid
      + '&TITULO_UUID=' + titulo_uuid;

    return this.http.get(url, { responseType: 'blob' });
  }


  // Liquidacion y pagos
  exportPdfSettlementPayment(acionista_uuid: string, anios: number): Observable<any> {

    const url = environment.urlApi + 'exportPdfPaymentSettlementReport?ID_REGISTRO=' + acionista_uuid
      + '&ULTIMOS_ANIOS=' + anios;

    return this.http.get(url, { responseType: 'blob' });
  }


  // reporte consultas pagos

  fetchPaymentList(): void {
    let entro = false;
    this._paginador.asObservable().subscribe(value => {
      entro = true;
      const body = JSON.stringify(value);
      return this.http.get(environment.urlApi + 'reportPaymentQueryList?paginador=' + body).subscribe(res => this._comptrollerShareholder.next(res));
    })

    if (!entro) {
      const body = JSON.stringify({
        first: 0,
        rows: 50,
        orderCampo: undefined,
        tipoOrder: TipoOrder.ASC
      });
      this.http.get(environment.urlApi + 'reportPaymentQueryList?paginador=' + body).subscribe(res => this._comptrollerShareholder.next(res));
    }
  }

  getPaymentList(paginador: TablaCargar): Observable<any> {
    return this._comptrollerShareholder.asObservable();
  }


  // CON paginador
  /* 
  exportExcelPaymentQuery(paginador: TablaCargar): Observable<any> {
    const body = JSON.stringify(paginador);
    const url = environment.urlApi + 'exportExcelComptrollerReporting?paginador=' + body;
    return this.http.get(url, { responseType: 'blob' });
  }
  
  exportCsvPaymentQuery(paginador: TablaCargar): Observable<any> {
    const body = JSON.stringify(paginador);
    const url = environment.urlApi + 'exportCsvComptrollerReporting?paginador=' + body;
    return this.http.get(url, { responseType: 'blob' });
  }
  
  exportPdfPaymentQuery(paginador: TablaCargar): Observable<any> {
    const body = JSON.stringify(paginador);
    const url = environment.urlApi + 'exportPdfComptrollerReporting?paginador=' + body;
    return this.http.get(url, { responseType: 'blob' });
  }
   */

  // SIN paginador

  exportExcelPaymentQuery(): Observable<any> {
    const url = environment.urlApi + 'exportExcelPaymentQuery';
    return this.http.get(url, { responseType: 'blob' });
  }

  exportCsvPaymentQuery(): Observable<any> {
    const url = environment.urlApi + 'exportCsvPaymentQuery';
    return this.http.get(url, { responseType: 'blob' });
  }

  exportPdfPaymentQuery(): Observable<any> {
    const url = environment.urlApi + 'exportPdfPaymentQuery';
    return this.http.get(url, { responseType: 'blob' });
  }



}
