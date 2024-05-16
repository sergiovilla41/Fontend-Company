import { Injectable } from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { User } from "src/app/model/user.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersList } from "src/app/model/usersList.model";
import { environment } from "src/environments/environment";

export let subject = new Subject<any>();
const options = {
    headers: {
        'Content-Type': 'application/json'
    }
};

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _refresh$ = new Subject<void>();
    constructor(private http: HttpClient) {
    }

    get refresh$() {
        return this._refresh$
    }

    validateUser(user: User): Observable<any> {

        let email = user.email;
        let password = user.password;

        let userLogin = {
            email,
            password
        }

        const headers = { 'content-type': 'application/json' };
        const body = JSON.stringify(userLogin);

        return this.http.post(environment.urlApi + 'login', body, { 'headers': headers })
    }


    newUser(user: UsersList): Observable<any> {
        const body = JSON.stringify(user);

        return this.http.post(environment.urlApi + 'addUser', body)
    }

    updateUser(user: UsersList): Observable<any> {

        const body = JSON.stringify(user);

        return this.http.put(environment.urlApi + 'updateUser', body)
            .pipe(
                tap(() => {
                    this._refresh$.next();
                })
            )
    }

    deleteUser(user: UsersList): Observable<any> {

        // const body = JSON.stringify(user);

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: headers, body: user };
        return this.http.delete(environment.urlApi + 'deteleUser', options)
    }

    getUsersList(): Observable<any> {
        return this.http.get(environment.urlApi + 'usersList')
    }


    getUser(id_usuario: number): Observable<any> {
        return this.http.get(environment.urlApi + 'getUser?id_usuario=' + id_usuario)
    }


    public getMessage(): Observable<any> {
        return subject.asObservable();
    }


    exportExcelUsers(): Observable<any> {
        const url = environment.urlApi + 'exportExcelUsers';
        return this.http.get(url, { responseType: 'blob' });
    }


    exportCsvUsers(): Observable<any> {
        const url = environment.urlApi + 'exportCsvUsers';
        return this.http.get(url, { responseType: 'blob' });
    }


    exportPdfUsers(): Observable<any> {
        const url = environment.urlApi + 'exportPdfUsers';
        return this.http.get(url, { responseType: 'blob' });
    }

}
