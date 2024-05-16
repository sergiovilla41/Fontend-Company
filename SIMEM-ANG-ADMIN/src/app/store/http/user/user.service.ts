import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { UserResponse } from "../../responses/user/UserList";
import { EmpresaDominio } from "../../model/EmpresaDominio";
import { User } from "../../model/User.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUserList() {
    return this.http.get<UserResponse[]>(environment.SIMEM_ADMIN_URL + "UserManagement/GetUsers")
  }

  getEmpresDominio() {
    return this.http.get<EmpresaDominio[]>(environment.SIMEM_ADMIN_URL + "UserManagement/ConsultCompanyByDomain")
  }

  createUser(user: User) {
    return this.http.post(environment.SIMEM_ADMIN_URL + "UserManagement/InsertUser", user, {
      responseType: "text"
    })
  }

  editUser(user: User) {
    return this.http.post(environment.SIMEM_ADMIN_URL + "UserManagement/UpdateUser", user, {
      responseType: "text"
    })
  }
}
