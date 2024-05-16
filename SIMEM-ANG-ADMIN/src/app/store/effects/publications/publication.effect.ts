import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs';
import {
  PublicationService,
  publicationResponseToPublicationModel,
} from '../../http/publications/publication.service';
import {
  deletePublicationInformation,
  getPublicationInformation,
  getPublicationInformationSuccess,
  savePublicationInformation,
  savePublicationInformationError,
  updatePublicationInformation,
} from '../../actions/publications/publication.action';

@Injectable()
export class PublicationEffect {
  constructor(private actions$: Actions, private service: PublicationService) {}

  getPublicationInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPublicationInformation),
      exhaustMap(({ idConfiguracionGeneracionArchivos }) =>
        this.service.getPublications(idConfiguracionGeneracionArchivos).pipe(
          map((publicationInformation) => {
            return getPublicationInformationSuccess({
              publicationInformation: publicationInformation.map((x) =>
                publicationResponseToPublicationModel(x)
              ),
            });
          })
        )
      )
    )
  );

  savePublicationInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(savePublicationInformation),
      exhaustMap(({ publicationInformation }) =>
        this.service.savePublication(publicationInformation).pipe(
          map(() =>
            getPublicationInformation({
              idConfiguracionGeneracionArchivos:
                publicationInformation.idConfiguracionGeneracionArchivos,
            })
          ),
          catchError(() => [savePublicationInformationError()])
        )
      )
    )
  );

  updatePublicationInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePublicationInformation),
      exhaustMap(({ publicationInformation }) =>
        this.service.updatePublication(publicationInformation).pipe(
          map(() =>
            getPublicationInformation({
              idConfiguracionGeneracionArchivos:
                publicationInformation.idConfiguracionGeneracionArchivos,
            })
          ),
          catchError(() => [savePublicationInformationError()])
        )
      )
    )
  );

  deletePublicationInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePublicationInformation),
      exhaustMap(({ publicationInformation }) =>
        this.service.deletePublication(publicationInformation.idPublicacionRegulatoria).pipe(
          map(() =>
            getPublicationInformation({
              idConfiguracionGeneracionArchivos:
                publicationInformation.idConfiguracionGeneracionArchivos,
            })
          ),
          catchError(() => [savePublicationInformationError()])
        )
      )
    )
  );
}
