import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map } from "rxjs";
import { ColumnsService, executionResponseToExecutionModel, propertiesResponseToPropertiesModel, sourceColumnsResponseToSourceColumnsModel } from "../../http/columns/columns.service";
import { errorApi, getExecutionInformation, getExecutionInformationSuccess, getExtractionSourceColumns, getExtractionSourceColumnsSuccess, getPurposeColumn, getPurposecolumnSuccess, getVersionColumn, getVersionColumnSuccess, saveExtractionColumnTargetVersion, saveExtractionColumnTargetVersionSuccess, saveSourceColumns, saveSourceColumnsSuccess } from "../../actions/columns.action";
import { Store } from "@ngrx/store";

@Injectable()
export class ColumnsEffect {
  constructor(private actions$: Actions, private service: ColumnsService, private store: Store) { }

  getExecutionInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getExecutionInformation),
      exhaustMap(({ idExtraction }) =>
        this.service.getExecutionByIdExtraction(idExtraction).pipe(
          map((executionInformation) => {
            return getExecutionInformationSuccess({
              executionInformation: executionInformation.map((x) =>
                executionResponseToExecutionModel(x)
              ),
            });
          })
        )
      )
    )
  );

  getExtractionSourceColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getExtractionSourceColumns),
      exhaustMap(({ idExtraction }) =>
        this.service.getSourceColumns(idExtraction).pipe(
          map((extractionSourceColumns) =>
            getExtractionSourceColumnsSuccess({
              sourceColumns: extractionSourceColumns.map((a) =>
                sourceColumnsResponseToSourceColumnsModel(a)
              ),
            })
          ),
          catchError(() => [errorApi()])
        )
      )
    )
  );

  saveSourceColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveSourceColumns),
      exhaustMap(({ sourceColumns }) =>
        this.service.saveSourceColumns(sourceColumns).pipe(
          map((sourceColumnsResult) => {

            this.store.dispatch(getExtractionSourceColumns({ idExtraction: sourceColumns?.idExtraccion }))

            return saveSourceColumnsSuccess({
              sourceColumnsResult: sourceColumnsResult,
            })
          }
          )
        )
      )
    )
  );

  getVersionColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getVersionColumn),
      exhaustMap(({ typeProperty }) =>
        this.service.getProperties(typeProperty).pipe(
          map((extractionProperties) =>
            getVersionColumnSuccess({
              versionColumn: extractionProperties.map((a) =>
                propertiesResponseToPropertiesModel(a)
              ),
            })
          )
        )
      )
    )
  );

  getPurposecolumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPurposeColumn),
      exhaustMap(({ typeProperty }) =>
        this.service.getProperties(typeProperty).pipe(
          map((extractionProperties) =>
            getPurposecolumnSuccess({
              purposeColumn: extractionProperties.map((a) =>
                propertiesResponseToPropertiesModel(a)
              ),
            })
          ),
          catchError(() => [errorApi()])
        )
      )
    )
  );

  saveExtractionColumnTargetVersion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveExtractionColumnTargetVersion),
      exhaustMap(({ sourceColumns }) =>
        this.service.saveExtractionColumnTargetVersion(sourceColumns).pipe(
          map((sourceColumnsResult) => {
            this.store.dispatch(getExtractionSourceColumns({idExtraction: sourceColumns?.idExtraccion}))
            return saveExtractionColumnTargetVersionSuccess({
              sourceColumnsResult: sourceColumnsResult,
            })
          })
        )
      )
    )
  );
}
