import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { countryCitiesInterface } from 'src/app/model/countryCities.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TypesService {

    constructor(private http: HttpClient) {
    }

    getPersonType(): Observable<any> {
        return this.http.get(environment.urlApi+'personTypeList')
    }

    getShareholderType(): Observable<any> {
        return this.http.get(environment.urlApi+'shareholderTypeList')
    }

    gettypeOfFiler(): Observable<any> {
        return this.http.get(environment.urlApi+'typeOfFilerList')
    }

    getIdentificationType(): Observable<any> {
        return this.http.get(environment.urlApi+'identificationType')
    }

    getTypeSource(): Observable<any> {
        return this.http.get(environment.urlApi+'getTypeSourceList')
    }

    getBank(): Observable<any> {
        return this.http.get(environment.urlApi+'bankList')
    }

    getAccountType(): Observable<any> {
        return this.http.get(environment.urlApi+'accountTypeList')
    }

    getNacionalityType(): Observable<any> {
        return this.http.get(environment.urlApi+'nationalityList')
    }

    getStateTrue(): Observable<any> {
        return this.http.get(environment.urlApi+'stateTrue')
    }

    getCountry(): Observable<any> {
        return this.http.get(environment.urlApi+'country')
    }

    getDepartment(country: countryCitiesInterface): Observable<any> {
       return this.http.get(environment.urlApi+'department?COUNTRY='+ country.isoCode)
    }

    getCity(department: countryCitiesInterface): Observable<any> {
       return this.http.get(environment.urlApi+'City?COUNTRY='+ department.isoCode + '&DEPARTMENT='+ department.isoCodeDepartment)
    }

}
