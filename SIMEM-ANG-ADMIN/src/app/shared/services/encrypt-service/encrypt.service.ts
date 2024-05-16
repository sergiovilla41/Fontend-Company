import { Injectable } from "@angular/core";
import { User } from "../../../store/model/User.model";
import { MsalService } from "@azure/msal-angular";


@Injectable({
  providedIn: 'root'
})
export class EncryptService {
  constructor(private msalService: MsalService) { }

  getUser(): User | undefined {
    let user: User | undefined;
    const claims = this.msalService.instance.getActiveAccount()
    console.log(this.msalService.instance.getActiveAccount())
    if (claims) {
      user = {
        correo: claims.username,
        nombre: claims.name
      }
    }
    return user;
  }
}
