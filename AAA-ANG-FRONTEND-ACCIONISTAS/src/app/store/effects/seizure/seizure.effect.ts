import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { ResponseInterface } from "src/app/model/response.model";
import { ShareholdersService } from "src/app/services/shareholders/shareholders.service";
import { TitlesService } from "src/app/services/titles/titles.service";
import { exportCsvTitle, exportCsvTitleError, exportCsvTitleSuccess, exportExcelTitle, exportExcelTitleError, exportExcelTitleSuccess, exportPdfTitle, exportPdfTitleError, exportPdfTitleSuccess } from "../../actions/title.action";
import { deleteSeizure, deleteSeizureError, deleteSeizureSuccess, newSeizure, newSeizureError, newSeizureSuccess, updateSeizure, updateSeizureError, updateSeizureSuccess } from "../../actions/seizure.action";
import { SeizureService } from "src/app/services/seizure/seizure.service";


@Injectable()
export class SeizureEffect {
  constructor(private shareholdersService: ShareholdersService, private actions$: Actions, private seizureService: SeizureService) { }

  newSeizure$ = createEffect(() => this.actions$.pipe(
    ofType(newSeizure),
    mergeMap(({ seizure }) => this.seizureService.newSeizure(seizure)
      .pipe(
        map((respuesta: ResponseInterface) => {
          return newSeizureSuccess({ msg: respuesta.msg, status: respuesta.status })
        }),
        catchError((err: HttpErrorResponse) => {
          return [newSeizureError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));

  updateSeizure$ = createEffect(() => this.actions$.pipe(
    ofType(updateSeizure),
    mergeMap(({ seizure }) => this.seizureService.updateSeizure(seizure)
      .pipe(
        map((respuesta: ResponseInterface) => {
          return updateSeizureSuccess({ msg: respuesta.msg, status: respuesta.status })
        }),
        catchError((err: HttpErrorResponse) => {
          return [updateSeizureError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));

  deleteSeizure$ = createEffect(() => this.actions$.pipe(
    ofType(deleteSeizure),
    mergeMap(({ seizure }) => this.seizureService.deleteSeizure(seizure)
      .pipe(
        map((respuesta: ResponseInterface) => {
          return deleteSeizureSuccess({ msg: respuesta.msg, status: respuesta.status })
        }),
        catchError((err: HttpErrorResponse) => {
          return [deleteSeizureError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));

/* 
  exportExcelTitle$ = createEffect(() => this.actions$.pipe(
    ofType(exportExcelTitle),
    mergeMap(({ paginador }) => this.titleService.exportExcelTitle(paginador)
      .pipe(
        map((respuesta: ResponseInterface) => {
          return exportExcelTitleSuccess({ payload: respuesta })
        }),
        catchError((err: HttpErrorResponse) => {
          return [exportExcelTitleError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));


  exportCsvTitle$ = createEffect(() => this.actions$.pipe(
    ofType(exportCsvTitle),
    mergeMap(({ paginador }) => this.titleService.exportCsvTitle(paginador)
      .pipe(
        map((respuesta: ResponseInterface) => {
          return exportCsvTitleSuccess({ payload: respuesta })
        }),
        catchError((err: HttpErrorResponse) => {
          return [exportCsvTitleError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));


  exportPdfTitle$ = createEffect(() => this.actions$.pipe(
    ofType(exportPdfTitle),
    mergeMap(({ paginador }) => this.titleService.exportPdfTitle(paginador)
      .pipe(
        map((respuesta: ResponseInterface) => {
          return exportPdfTitleSuccess({ payload: respuesta })
        }),
        catchError((err: HttpErrorResponse) => {
          return [exportPdfTitleError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));

 */


}
