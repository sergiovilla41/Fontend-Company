import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map } from "rxjs";
import { RegulatoryDatasetsResponseToRegulatoryDatasetsModel, RegulatoryDatasetsService } from "../../http/regulatory-datasets/regulatory-datasets.service";
import { getRegulatoryDatasetsItems, getRegulatoryDatasetsItemsSuccess } from "../../actions/regulatory-datasets.action";

@Injectable()
export class RegulatoryDatasetsEffect {
  constructor(private actions$: Actions, private service: RegulatoryDatasetsService) { }

  getRegulatoryDatasetsItems$ = createEffect(() => this.actions$.pipe(
    ofType(getRegulatoryDatasetsItems),
    exhaustMap(() => this.service.getRegulatoryDatasets()
      .pipe(
        map((regulatoryDatasetsItems) => getRegulatoryDatasetsItemsSuccess({regulatoryDatasetsItems : regulatoryDatasetsItems.map(a => RegulatoryDatasetsResponseToRegulatoryDatasetsModel(a)) }))
      ))
  )
  );
}
