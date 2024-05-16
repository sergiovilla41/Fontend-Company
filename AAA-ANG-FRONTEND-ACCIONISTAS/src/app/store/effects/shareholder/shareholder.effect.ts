import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { ResponseInterface } from "src/app/model/response.model";
import { Shareholders } from "src/app/model/shareholders.model";
import { ShareholdersService } from "src/app/services/shareholders/shareholders.service";
import { UserService } from "src/app/services/user/user.service";
import { exportCsvShareholder, exportCsvShareholderError, exportCsvShareholderSuccess, exportExcelShareholder, exportExcelShareholderError, exportExcelShareholderSuccess, exportPdfShareholder, exportPdfShareholderError, exportPdfShareholderSuccess, newShareholder, newShareholderError, newShareholderSuccess, shareholderList, shareholderListError, shareholderListSuccess, shareholderSeizureList, shareholderSeizureListError, shareholderSeizureListSuccess, shareholderWarrantyList, shareholderWarrantyListError, shareholderWarrantyListSuccess, UpdateShareholder, UpdateShareholderError, UpdateShareholderSuccess } from "../../actions/shareholder.action";

@Injectable()
export class ShareholderEffect {
  constructor(private userService: UserService, private shareholdersService: ShareholdersService, private actions$: Actions) { }

  newShareholder$ = createEffect(() => this.actions$.pipe(
    ofType(newShareholder),
    mergeMap(({ shareholder }) => this.shareholdersService.newShareholder(shareholder)
      .pipe(
        map((respuesta: ResponseInterface) => {
          this.shareholdersService.fetchShareholdersList()
          return newShareholderSuccess({ msg: respuesta.msg, status: respuesta.status })
        }),
        catchError((err: HttpErrorResponse) => {
          return [newShareholderError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));


  UpdateShareholder$ = createEffect(() => this.actions$.pipe(
    ofType(UpdateShareholder),
    mergeMap(({ shareholder }) => this.shareholdersService.updateShareholder(shareholder)
      .pipe(
        map((respuesta: ResponseInterface) => {
          this.shareholdersService.fetchShareholdersList()
          return UpdateShareholderSuccess({ msg: respuesta.msg, status: respuesta.status })
        }),
        catchError((err: HttpErrorResponse) => {
          
          return [UpdateShareholderError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));


  shareholderList$ = createEffect(() => this.actions$.pipe(
    ofType(shareholderList),
    mergeMap(() => this.shareholdersService.getShareholderSelect()
      .pipe(
        map((shareholderList: Shareholders[]) => {
          return shareholderListSuccess({ shareholderList: shareholderList })
        }),
        catchError((err: HttpErrorResponse) => {
          
          return [shareholderListError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));


  shareholderSeizureList$ = createEffect(() => this.actions$.pipe(
    ofType(shareholderSeizureList),
    mergeMap(() => this.shareholdersService.getShareholderSeizureSelect()
      .pipe(
        map((shareholderSeizureList: Shareholders[]) => {
          return shareholderSeizureListSuccess({ shareholderSeizureList: shareholderSeizureList })
        }),
        catchError((err: HttpErrorResponse) => {
          
          return [shareholderSeizureListError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));


  shareholderWarrantyList$ = createEffect(() => this.actions$.pipe(
    ofType(shareholderWarrantyList),
    mergeMap(() => this.shareholdersService.getShareholderWarrantySelect()
      .pipe(
        map((shareholderWarrantyList: Shareholders[]) => {
          return shareholderWarrantyListSuccess({ shareholderWarrantyList: shareholderWarrantyList })
        }),
        catchError((err: HttpErrorResponse) => {
          
          return [shareholderWarrantyListError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));

  /* deleteUser$ = createEffect(() => this.actions$.pipe(
      ofType(deleteUser),
      mergeMap(({user}) => this.userService.deleteUser(user)
          .pipe(
              map((respuesta: ResponseInterface) =>{
                  return deletUserSuccess({msg: respuesta.msg, status: respuesta.status})
              }),
              catchError((err: HttpErrorResponse)  => {
                  return [deletUserError({ msg: err.error, status: err.status })]
              })
          )
      )
  )); */

  exportExcelShareholder$ = createEffect(() => this.actions$.pipe(
    ofType(exportExcelShareholder),
    mergeMap(({ paginador }) => this.shareholdersService.exportExcelShareholder(paginador)
      .pipe(
        map((respuesta: ResponseInterface) => {
          return exportExcelShareholderSuccess({ payload: respuesta })
        }),
        catchError((err: HttpErrorResponse) => {
          return [exportExcelShareholderError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));


  exportCsvShareholder$ = createEffect(() => this.actions$.pipe(
    ofType(exportCsvShareholder),
    mergeMap(({ paginador }) => this.shareholdersService.exportCsvShareholder(paginador)
      .pipe(
        map((respuesta: ResponseInterface) => {
          return exportCsvShareholderSuccess({ payload: respuesta })
        }),
        catchError((err: HttpErrorResponse) => {
          return [exportCsvShareholderError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));


  exportPdfShareholder$ = createEffect(() => this.actions$.pipe(
    ofType(exportPdfShareholder),
    mergeMap(({ paginador }) => this.shareholdersService.exportPdfShareholder(paginador)
      .pipe(
        map((respuesta: ResponseInterface) => {
          return exportPdfShareholderSuccess({ payload: respuesta })
        }),
        catchError((err: HttpErrorResponse) => {
          return [exportPdfShareholderError({ msg: err.error, status: err.status })]
        })
      )
    )
  ));


}
