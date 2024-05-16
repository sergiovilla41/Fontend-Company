import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { RegulatoryClassificationResponseToRegulatoryClassificationModel, RegulatoryClassificationService } from '../../http/regulatory-classification/regulatory-classification.service';
import { addRegulatoryClassificationItems, addRegulatoryClassificationItemsSuccess, getRegulatoryClassificationItems, getRegulatoryClassificationItemsSuccess, updateRegulatoryClassificationItems, updateRegulatoryClassificationItemsSuccess } from '../../actions/regulatory-classification.action';

@Injectable()
export class RegulatoryClassificationEffect {
  constructor(
    private actions$: Actions,
    private service: RegulatoryClassificationService
  ) {}

  getRegulatoryClassificationItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRegulatoryClassificationItems),
      exhaustMap(() =>
        this.service.getRegulatoryClassification().pipe(
          map((regulatoryClassificationItems) => {
            return getRegulatoryClassificationItemsSuccess({
              regulatoryClassificationItems: regulatoryClassificationItems.map(item => ({
                ...item,
                fechaCreacion: item.fechaCreacion instanceof Date ? item.fechaCreacion : (item.fechaCreacion ? new Date(item.fechaCreacion) : null),
              }))
            });
          })
        )
      )
    )
  );

  updateRegulatoryClassificationItems$ = createEffect(() => this.actions$.pipe(
    ofType(updateRegulatoryClassificationItems),
    exhaustMap(({dataRegulatoryClassification}) =>
      this.service.updateRegulatoryClassification(dataRegulatoryClassification).pipe(
        map(() =>
          getRegulatoryClassificationItems()
        )
      )
    )
  ));

  addRegulatoryClassificationItems$ = createEffect(() => this.actions$.pipe(
    ofType(addRegulatoryClassificationItems),
    exhaustMap(({ dataRegulatoryClassification }) =>
      this.service.addRegulatoryClassification(dataRegulatoryClassification).pipe(
        map(() =>
          getRegulatoryClassificationItems()
        )
      )
    )
  ));
}

