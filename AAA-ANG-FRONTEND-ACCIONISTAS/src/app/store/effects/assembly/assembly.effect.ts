import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { ResponseInterface } from "src/app/model/response.model";
import { UserService } from "src/app/services/user/user.service";
import { exportExcelAssembly, exportExcelAssemblySuccess, exportExcelAssemblyError, exportCsvAssembly, exportCsvAssemblySuccess, exportCsvAssemblyError, exportPdfAssembly, exportPdfAssemblyError, exportPdfAssemblySuccess, assemblyList, assemblyListSuccess, assemblyListError } from "../../actions/assembly.action";
import { AssemblyService } from "src/app/services/assembly/assembly.service";
import { Assembly } from "src/app/model/assembly.model";

@Injectable()
export class AssemblyEffect {
  constructor(private userService: UserService, private assemblyService: AssemblyService, private actions$: Actions) { }

  exportExcelAssembly$ = createEffect(() => this.actions$.pipe(
    ofType(exportExcelAssembly),
    mergeMap(({ paginador }) => this.assemblyService.exportExcelAssembly(paginador)
      .pipe(
        map((respuesta: ResponseInterface) => {
          return exportExcelAssemblySuccess({ payload: respuesta })
        }),
        catchError((err: HttpErrorResponse) => {
          return [exportExcelAssemblyError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));

  exportCsvAssembly$ = createEffect(() => this.actions$.pipe(
    ofType(exportCsvAssembly),
    mergeMap(({ paginador }) => this.assemblyService.exportCsvAssembly(paginador)
      .pipe(
        map((respuesta: ResponseInterface) => {
          return exportCsvAssemblySuccess({ payload: respuesta })
        }),
        catchError((err: HttpErrorResponse) => {
          return [exportCsvAssemblyError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));

  exportPdfAssembly$ = createEffect(() => this.actions$.pipe(
    ofType(exportPdfAssembly),
    mergeMap(({ paginador }) => this.assemblyService.exportPdfAssembly(paginador)
      .pipe(
        map((respuesta: ResponseInterface) => {
          return exportPdfAssemblySuccess({ payload: respuesta })
        }),
        catchError((err: HttpErrorResponse) => {
          return [exportPdfAssemblyError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));

  assemblyList$ = createEffect(() => this.actions$.pipe(
    ofType(assemblyList),
    mergeMap(() => this.assemblyService.getAssemblySelect()
      .pipe(
        map((assemblyList: Assembly[]) => {
          return assemblyListSuccess({ assemblyList: assemblyList})
        }),
        catchError((err: HttpErrorResponse) => {
          
          return [assemblyListError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));


}