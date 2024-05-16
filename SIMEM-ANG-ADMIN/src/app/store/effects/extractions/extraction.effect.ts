import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs';
import {
  ExtractionService,
  extractionResponseToExtractionModel,
} from '../../http/extractions/extraction.service';
import {
  deleteExtractionInformation,
  getExtractionInformation,
  getExtractionInformationSuccess,
  saveExtractionInformation,
  saveExtractionInformationError,
  updateExtractionInformation,
} from '../../actions/extractions/extraction.action';

@Injectable()
export class ExtractionEffect {
  constructor(private actions$: Actions, private service: ExtractionService) {}

  getExtractionInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getExtractionInformation),
      exhaustMap(({ idConfiguracionGeneracionArchivos }) =>
        this.service.getExtractions(idConfiguracionGeneracionArchivos).pipe(
          map((extractionInformation) => {
            return getExtractionInformationSuccess({
              extractionInformation: extractionInformation.map((x) =>
                extractionResponseToExtractionModel(x)
              ),
            });
          })
        )
      )
    )
  );

  saveExtractionInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveExtractionInformation),
      exhaustMap(({ extractionInformation }) =>
        this.service.saveExtraction(extractionInformation).pipe(
          map(() =>
            getExtractionInformation({
              idConfiguracionGeneracionArchivos: extractionInformation.idConfiguracionGeneracionArchivos,
            })
          ),
          catchError(() => [saveExtractionInformationError()])
        )
      )
    )
  );

  updateExtractionInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateExtractionInformation),
      exhaustMap(({ extractionInformation }) =>
        this.service.updateExtraction(extractionInformation).pipe(
          map(() =>
            getExtractionInformation({
              idConfiguracionGeneracionArchivos: extractionInformation.idConfiguracionGeneracionArchivos,
            })
          ),
          catchError(() => [saveExtractionInformationError()])
        )
      )
    )
  );

  deleteExtractionInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteExtractionInformation),
      exhaustMap(({ extractionInformation }) =>
        this.service.deleteExtraction(extractionInformation.idExtraccion).pipe(
          map(() =>
            getExtractionInformation({
              idConfiguracionGeneracionArchivos: extractionInformation.idConfiguracionGeneracionArchivos,
            })
          ),
          catchError(() => [saveExtractionInformationError()])
        )
      )
    )
  );
}
