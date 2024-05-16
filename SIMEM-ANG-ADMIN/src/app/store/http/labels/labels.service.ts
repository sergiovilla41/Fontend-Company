import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { LabelResponse } from "../../interfaces/lables.interface";
import { Label } from "../../model/labels.model";

@Injectable({
  providedIn: 'root'
})
export class LabelService{
  constructor(private http: HttpClient){}

  getLabels(){
    return this.http.get<LabelResponse[]>(environment.SIMEM_ADMIN_URL + "AssociatedDataSet/GetDataSet")
  }

  updateLabel(label: Label){
    return this.http.put(environment.SIMEM_ADMIN_URL + "Labels/UpdateLabel", label, {
      responseType: "text"
    })
  }

  createLabel(label: Label){
    delete label.id
    return this.http.post(environment.SIMEM_ADMIN_URL + "Labels/InsertLabel", label, {
      responseType: "text"
    })
  }
}
