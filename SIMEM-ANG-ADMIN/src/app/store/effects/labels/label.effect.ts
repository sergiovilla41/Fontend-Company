import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map } from "rxjs";
import { LabelService } from "../../http/labels/labels.service";
import { createLabel, createLabelSuccess, getLabels, getLabelsSuccess, updateLabel, updateLabelSuccess } from "../../actions/labels.action";
import { LabelResponseToLabel } from "../../interfaces/lables.interface";
import { Store } from "@ngrx/store";
import { State } from "../../model/state.model";

@Injectable()
export class LabelsEffect {
  constructor(private actions$: Actions, private service: LabelService, private store: Store<State>) { }

  getExecutionInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getLabels),
      exhaustMap(() =>
        this.service.getLabels().pipe(
          map((labels) => {
            return getLabelsSuccess({labels: labels.map(a => LabelResponseToLabel(a))})
          })
        )
      )
    )
  );

  updateExecutionInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateLabel),
      exhaustMap(({label}) =>
        this.service.updateLabel(label).pipe(
          map(() => {
            this.store.dispatch(updateLabelSuccess())
            return getLabels()
          })
        )
      )
    )
  );

  createExecutionInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createLabel),
      exhaustMap(({label}) =>
        this.service.createLabel(label).pipe(
          map(() => {
            this.store.dispatch(createLabelSuccess())
            return getLabels()
          })
        )
      )
    )
  );

}
