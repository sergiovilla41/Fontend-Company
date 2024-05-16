import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService{
  loading = new Subject<boolean>()

  setLoading(a: boolean){
    this.loading.next(a)
  }

  getLoading(){
    return this.loading.asObservable()
  }
}
