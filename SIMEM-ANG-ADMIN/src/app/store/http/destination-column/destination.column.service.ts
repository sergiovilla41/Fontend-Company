import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DestinationColumnModel } from "../../model/destination-column/destination.column.model";


@Injectable({
  providedIn: 'root'
})
export class DestinationColumnService {
  private baseUrl = 'https://localhost:7100/';

  constructor(private http: HttpClient) { }


  getDestinationColumn(): Observable<DestinationColumnModel[]> {
    return this.http.get<DestinationColumnModel[]>(`${this.baseUrl}ConfiguracionColumnasDestinoController/ListColumnaDestino`);
  }


  updateDestinationColumn(destinationColumn: DestinationColumnModel): Observable<DestinationColumnModel> {
    return this.http.put<any>(`${this.baseUrl}ConfiguracionColumnasDestinoController/UpdateColumnaDestino`, destinationColumn);
  }


  addDestinationColumn(destinationColumn: DestinationColumnModel): Observable<DestinationColumnModel> {
    return this.http.post<any>(`${this.baseUrl}ConfiguracionColumnasDestinoController/CreateColumnaDestino`, destinationColumn);
  }
}
