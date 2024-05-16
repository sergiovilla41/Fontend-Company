import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

  constructor(private http: HttpClient) { }


  refreshtoken(token: String): Observable<any> {
    const data = {token: token}
    const body = JSON.stringify(data);
    return this.http.post(environment.urlApi + 'refreshToken', body)
  }

}


