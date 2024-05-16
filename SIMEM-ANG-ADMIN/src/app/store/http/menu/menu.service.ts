import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MenuModel } from "../../model/menu.model";
import { environment } from "../../../../environments/environment";

interface MenuResponse{
  id: string,
  children: MenuResponse[],
  enlace: string,
  icono: string,
  titulo: string
}

export const menuResponseToMenuModel = (a: MenuResponse): MenuModel =>{
  return {
    id: a?.id,
    name: a?.titulo,
    url: a?.enlace,
    icon: a?.icono,
    children: a?.children?.map(b => menuResponseToMenuModel(b))
  }
}


@Injectable({
  providedIn: 'root'
})
export class MenuService{
  constructor(private http: HttpClient){}

  getMenu(): Observable<MenuResponse[]>{
    return this.http.get<MenuResponse[]>(environment.SIMEM_ADMIN_URL+'Menu', {
      params: {
        projectName: "simem"
      }
    })
  }
}
