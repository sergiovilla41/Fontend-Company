import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RolService {
  constructor(private http: HttpClient) {}

  getRol(): Observable<any> {
    return this.http.get(environment.urlApi + "roleList");
  }
}
