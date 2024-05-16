import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { State } from "../model/state.model";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  isUser: boolean;
  constructor(private store: Store<State>, private router: Router) {
    this.store.subscribe(({ userState }) => {
      this.isUser = userState.isUser;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.isUser) {
      return this.isUser;
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
