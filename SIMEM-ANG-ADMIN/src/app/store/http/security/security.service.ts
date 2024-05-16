import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../model/User.model";
import { environment } from "../../../../environments/environment";
import { Empresa } from "../../model/empresa.model";

export interface ValidateUserResponse {
  token: string,
  empresas: Empresa[],
  permisos: string
}

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  constructor(private http: HttpClient) { }

  validateUser(user: User): Observable<ValidateUserResponse> {
    return this.http.post<ValidateUserResponse>(environment.SIMEM_ADMIN_URL + "Security/ValidateUser", user, {
      params: { app: "SIMEM" }
    })
  }
}
