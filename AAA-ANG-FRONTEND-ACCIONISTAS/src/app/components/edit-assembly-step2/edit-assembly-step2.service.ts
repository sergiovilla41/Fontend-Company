import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { OpcionRespuesta } from "src/app/model/votacion.model";

@Injectable({
  providedIn: 'root'
})
export class EditAssemblyStep2Service{
  private comentarios = new BehaviorSubject(new Map<string, boolean>(JSON.parse(localStorage.getItem('comentarios'))));

  setComentarios(comentarios: Map<string, boolean>){
    if(comentarios){
      const entries = []
      comentarios.forEach((value, key) =>{
        entries.push([key, value])
      })
      this.comentarios.next(comentarios)
      localStorage.setItem('comentarios', JSON.stringify(entries));
    }else{
      localStorage.removeItem('comentarios')
      this.comentarios.next(null);
    }
  }

  getComentarios(){
    return this.comentarios.asObservable();
  }
}
