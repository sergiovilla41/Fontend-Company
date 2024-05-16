import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { ResponseInterface } from "src/app/model/response.model";
import { ShareholdersService } from "src/app/services/shareholders/shareholders.service";
import { exportCsvTitle, exportCsvTitleError, exportCsvTitleSuccess, exportExcelTitle, exportExcelTitleError, exportExcelTitleSuccess, exportPdfTitle, exportPdfTitleError, exportPdfTitleSuccess } from "../../actions/title.action";
import { WarrantyService } from "src/app/services/warranty/warranty.service";
import { newWarranty, newWarrantySuccess, newWarrantyError, updateWarranty, updateWarrantySuccess, updateWarrantyError, deleteWarranty, deleteWarrantySuccess, deleteWarrantyError } from "../../actions/warranty.action";


@Injectable()
export class WarrantyEffect {
  constructor(private shareholdersService: ShareholdersService, private actions$: Actions, private warrantyService: WarrantyService) { }

  newWarranty$ = createEffect(() => this.actions$.pipe(
    ofType(newWarranty),
    mergeMap(({ warranty }) => this.warrantyService.newWarranty(warranty)
      .pipe(
        map((respuesta: ResponseInterface) => {
          return newWarrantySuccess({ msg: respuesta.msg, status: respuesta.status })
        }),
        catchError((err: HttpErrorResponse) => {
          return [newWarrantyError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));

  updateWarranty$ = createEffect(() => this.actions$.pipe(
    ofType(updateWarranty),
    mergeMap(({ warranty }) => this.warrantyService.updateWarranty(warranty)
      .pipe(
        map((respuesta: ResponseInterface) => {
          return updateWarrantySuccess({ msg: respuesta.msg, status: respuesta.status })
        }),
        catchError((err: HttpErrorResponse) => {
          return [updateWarrantyError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));

  deleteWarranty$ = createEffect(() => this.actions$.pipe(
    ofType(deleteWarranty),
    mergeMap(({ warranty }) => this.warrantyService.deleteWarranty(warranty)
      .pipe(
        map((respuesta: ResponseInterface) => {
          return deleteWarrantySuccess({ msg: respuesta.msg, status: respuesta.status })
        }),
        catchError((err: HttpErrorResponse) => {
          return [deleteWarrantyError({ msg: err.error, status: err.status })]
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
