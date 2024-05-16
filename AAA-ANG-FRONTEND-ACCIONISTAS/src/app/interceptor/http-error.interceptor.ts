import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";

import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RefreshTokenService } from "../services/refreshToken/refreshToken.service";
import { Router } from "@angular/router";
import { State } from "src/app/model/state.model";
import { Store } from "@ngrx/store";
import { catchError } from "rxjs/operators";
import { logout } from "src/app/store/actions/user.action";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<State>,
    private router: Router,
    private _snackBar: MatSnackBar,
    private refreshToken: RefreshTokenService
  ) {}

/*   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          if (error.error.status === 500) {
            this.store.dispatch(logout());
            this.router.navigate(["/login"]);
            this.snackBar(error.error.msg);
            return throwError("Internal Server Error");
          } else {
            
            this.snackBar(error.error.msg);
          }
        }
      })
    );
  } */

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error.status === 500) {
          this.store.dispatch(logout());
          this.router.navigate(['/login'])
          this.snackBar(error.error.msg);
          return throwError(error.error.msg);
        } else if (error.error instanceof Blob && error.error.type === 'application/json') {
          // Si el error es un Blob con tipo 'application/json', lo leemos como texto
          const reader = new FileReader();
          reader.onload = () => {
            const errorMessage = JSON.parse(reader.result as string);
            this.snackBar(errorMessage.msg);
          };
          reader.readAsText(error.error);
        } else if (error.error || error.error.msg) {
          this.snackBar(error.error.msg);
        } else {
          // Otros errores no manejados específicamente
          console.error('Error no manejado:', error);
        }
        
        // Propaga el error para que el componente que llama al servicio pueda manejarlo también si es necesario
        return throwError(error);
      })
    );
  }


  snackBar(msg: string) {
    this._snackBar.open(msg, "Cerrar", {
      duration: 4000,
      verticalPosition: "top",
      panelClass: ["background-red"],
    });
  }
}
