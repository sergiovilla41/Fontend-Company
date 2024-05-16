import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs";
import { ResponseInterface } from "src/app/model/response.model";
import { ShareholdersService } from "src/app/services/shareholders/shareholders.service";
import { TitlesService } from "src/app/services/titles/titles.service";
import {
  cancelTitle,
  cancelTitleError,
  cancelTitleSuccess,
  exportCsvTitle,
  exportCsvTitleError,
  exportCsvTitleSuccess,
  exportExcelTitle,
  exportExcelTitleError,
  exportExcelTitleSuccess,
  exportPdfTitle,
  exportPdfTitleError,
  exportPdfTitleSuccess,
  newTitle,
  newTitleError,
  newTitleSuccess,
  titleList,
  titleListError,
  titleListSuccess,
  editTitle,
  editTitleError,
  editTitleSuccess,
  titleShareholder,
  titleShareholderSuccess,
  titleShareholderError,
} from "../../actions/title.action";
import { Titles } from "src/app/model/titles.model";

@Injectable()
export class TitleEffect {
  constructor(
    private shareholdersService: ShareholdersService,
    private actions$: Actions,
    private titleService: TitlesService
  ) {}

  newTitle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newTitle),
      mergeMap(({ title }) =>
        this.titleService.newTitle(title).pipe(
          map((respuesta: ResponseInterface) => {
            return newTitleSuccess({
              msg: respuesta.msg,
              status: respuesta.status,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            return [newTitleError({ msg: err.error, status: err.status })];
          })
        )
      )
    )
  );

  cancelTitle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cancelTitle),
      mergeMap(({ cancelTitles }) =>
        this.titleService.cancelTitle(cancelTitles).pipe(
          map((respuesta: ResponseInterface) => {
            return cancelTitleSuccess({
              msg: respuesta.msg,
              status: respuesta.status,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            
            return [cancelTitleError({ msg: err.error, status: err.status })];
          })
        )
      )
    )
  );

  editTitle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editTitle),
      mergeMap(({ editTitles }) =>
        this.titleService.editTitle(editTitles).pipe(
          map((respuesta: ResponseInterface) => {
            return editTitleSuccess({
              msg: respuesta.msg,
              status: respuesta.status,
            });
          }),
          catchError((err: HttpErrorResponse) => {
            
            return [editTitleError({ msg: err.error, status: err.status })];
          })
        )
      )
    )
  );

  titleList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(titleList),
      mergeMap(() =>
        this.titleService.getTitlesSeizuireSelect().pipe(
          map((titleList: Titles[]) => {
            return titleListSuccess({ titleList: titleList });
          }),
          catchError((err: HttpErrorResponse) => {
            
            return [titleListError({ msg: err.error, status: err.status })];
          })
        )
      )
    )
  );

  /*     UpdateShareholder$ = createEffect(() => this.actions$.pipe(
          ofType(UpdateShareholder),
          mergeMap(({shareholder}) => this.shareholdersService.updateShareholder(shareholder)
              .pipe(
                  map((respuesta: ResponseInterface) =>{
                      return UpdateShareholderSuccess({msg: respuesta.msg, status: respuesta.status})
                  }),
                  catchError((err: HttpErrorResponse)  => {
                      
                      return [UpdateShareholderError({ msg: err.error, status: err.status })]
                  })
              )
          )
      )); */

  exportExcelTitle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exportExcelTitle),
      mergeMap(({ paginador }) =>
        this.titleService.exportExcelTitle(paginador).pipe(
          map((respuesta: ResponseInterface) => {
            return exportExcelTitleSuccess({ payload: respuesta });
          }),
          catchError((err: HttpErrorResponse) => {
            return [
              exportExcelTitleError({ msg: err.error, status: err.status }),
            ];
          })
        )
      )
    )
  );

  exportCsvTitle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exportCsvTitle),
      mergeMap(({ paginador }) =>
        this.titleService.exportCsvTitle(paginador).pipe(
          map((respuesta: ResponseInterface) => {
            return exportCsvTitleSuccess({ payload: respuesta });
          }),
          catchError((err: HttpErrorResponse) => {
            return [
              exportCsvTitleError({ msg: err.error, status: err.status }),
            ];
          })
        )
      )
    )
  );

  exportPdfTitle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exportPdfTitle),
      mergeMap(({ paginador }) =>
        this.titleService.exportPdfTitle(paginador).pipe(
          map((respuesta: ResponseInterface) => {
            return exportPdfTitleSuccess({ payload: respuesta });
          }),
          catchError((err: HttpErrorResponse) => {
            return [
              exportPdfTitleError({ msg: err.error, status: err.status }),
            ];
          })
        )
      )
    )
  );


// lista selector reportes titulos

titleShareholder$ = createEffect(() => this.actions$.pipe(
  ofType(titleShareholder),
  mergeMap(({titulo_uuid}) => this.titleService.getTitlteShareholder(titulo_uuid)
      .pipe(
          map((title: Titles[]) =>{
              return titleShareholderSuccess({title: title})
          }),
          catchError((err: HttpErrorResponse)  => {
              return [titleShareholderError({ msg: err.error.msg, status: err.status })]
          })
      )
  )
));






}

