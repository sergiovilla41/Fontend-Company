import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DistribuirDividendo } from "src/app/model/distribuirDividendo";
import { Dividendo } from "src/app/model/dividendo.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DividendoService {
  constructor(private http: HttpClient) {}
  addDividendo(dividendo: Dividendo) {
    return this.http.post(
      environment.urlApi + "addParameterization",
      JSON.stringify(dividendo)
    );
  }

  distribuirDividendo(distribuirDividendo: DistribuirDividendo) {
    return this.http.post(
      environment.urlApi + "createPaymentSettings",
      JSON.stringify({
        DATA: distribuirDividendo.DATA,
        EMAILADMIN: JSON.parse(localStorage.getItem("dataLogin")).email,
        ROLADMIN: JSON.parse(localStorage.getItem("dataLogin")).rol.rol,
      })
    );
  }
}
