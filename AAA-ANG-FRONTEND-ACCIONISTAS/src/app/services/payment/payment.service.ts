import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TablaCargar, TipoOrder } from 'src/app/interfaces/shareholders.interface';
import { Payment } from 'src/app/model/payment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private _refresh$ = new Subject<void>();
  private _paginador = new Subject<TablaCargar>();
  private _payment = new Subject<any>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$
  }

  getPaymentList(paginador: TablaCargar): Observable<any> {
    return this._payment.asObservable();
  }

  fetchPaymentList(): void {
    let entro = false;
    this._paginador.asObservable().subscribe(value => {
      entro = true;
      const body = JSON.stringify(value);
      return this.http.get(environment.urlApi+'getpaymentList?paginador=' + body).subscribe(res => this._payment.next(res));
    })

    if (!entro) {
      const body = JSON.stringify({
        first: 0,
        rows: 50,
        orderCampo: undefined,
        tipoOrder: TipoOrder.ASC
      });
      this.http.get(environment.urlApi+'getpaymentList?paginador=' + body).subscribe(res => this._payment.next(res));
    }
  }

  setPaginador(paginador: TablaCargar): void {
    this._paginador.next(paginador);
  }

  getPayment(idPayment: string): Observable<any> {
    return this.http.get(environment.urlApi+'getPayment?idPayment=' + idPayment);
  }

  updatePayment(payment: Payment): Observable<any> {
    const body = JSON.stringify(payment);
    return this.http.put(environment.urlApi+'updatePayments', body);
  }

  deletePayment(payment: Payment) {
    const body = JSON.stringify(payment);
    return this.http.delete(environment.urlApi+'deletePayments', {body})
  }

}
