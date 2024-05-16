import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Traceability } from 'src/app/model/traceability.model';
import { TablaCargar } from 'src/app/interfaces/shareholders.interface';
import { environment } from 'src/environments/environment';


export let subject = new Subject<any>();

@Injectable({
  providedIn: 'root'
})
export class TraceabilityService {

  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) {
  }

  get refresh$() {
      return this._refresh$
  }

getTraceabilityList(paginador: TablaCargar): Observable<any> {
  const body = JSON.stringify(paginador);
  return this.http.get(environment.urlApi + 'logsList?paginador=' + body);
}

}
