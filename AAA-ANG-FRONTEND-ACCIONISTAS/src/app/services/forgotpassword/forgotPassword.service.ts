import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { User } from "src/app/model/user.model";
import { environment } from "src/environments/environment";

export let subject = new Subject<any>();

@Injectable({
    providedIn: 'root'
})
export class forgotPasswordService{

    constructor(private http: HttpClient){

    }

    forgotPassword(email: User): Observable<any>{
        return this.http.get(environment.urlApi + 'forgotPassword?email=' + email)
    }

    public getMessage(): Observable<any> {
        return subject.asObservable();
    }

}
