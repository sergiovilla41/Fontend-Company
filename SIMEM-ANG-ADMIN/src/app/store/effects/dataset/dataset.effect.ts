import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs';
import {
  getClasificationRegulatorysuccess,
  getHasRecord,
  getHasRecordSuccess,
  getTypeView,
  getTypeViewsuccess,
  executePipeline,
  cancelExecutePipeline
} from '../../actions/dataset/dataset.action';
import {
  errorApi,
  getClasificationRegulatory,
  saveDataBasicDataSet,
  saveDataBasicDataSetSuccess,
} from '../../actions/dataset/dataset.action';
import {
  BasicDataResponseToBasicDataModel,
  CategoryResponseToCategoryModel,
  ClasificationRegulatoryResponseToClasificationRegulatoryList,
  DataSetService,
  GranularityResponseToPropertyList,
  HasRecordResponseToHasRecordRModel,
  LabelsResponseToPropertyList,
  PeriodicityResponseToPropertyList,
  TypeViewResponseToTypeViewModel,
  dataSetResponseToDataSetModel,
  duractionIsoResponseToPropertyList,
} from '../../http/dataset/dataset.service';
import {
  getBasicDataset,
  getBasicDatasetSuccess,
  getCategories,
  getCategoriesSuccess,
  getDatasets,
  getDatasetsSuccess,
  getDurationISO,
  getDurationISOSuccess,
  getGranularity,
  getGranularitySuccess,
  getLabels,
  getLabelsSuccess,
  getPeriodicity,
  getPeriodicitySuccess,
} from '../../actions/dataset/dataset.action';

@Injectable()
export class DataSetEffect {
  constructor(private actions$: Actions, private service: DataSetService) { }

  getDatasets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDatasets),
      exhaustMap(() =>
        this.service.getDatasets().pipe(
          map((dataSets) =>
            getDatasetsSuccess({
              dataSetsItems: dataSets.map((a) =>
                dataSetResponseToDataSetModel(a)
              ),
            })
          )
        )
      )
    )
  );

  getBasicDataDataSet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBasicDataset),
      exhaustMap(({ idConfigurationDataSet }) =>
        this.service.getDataSetBasicData(idConfigurationDataSet).pipe(
          map((basicData) =>
            getBasicDatasetSuccess({
              basicDataDataSet: BasicDataResponseToBasicDataModel(basicData),
            })
          )
        )
      )
    )
  );

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategories),
      exhaustMap(() =>
        this.service.getCategory().pipe(
          map((categories) =>
            getCategoriesSuccess({
              categoriesItems: categories.map((a) =>
                CategoryResponseToCategoryModel(a)
              ),
            })
          )
        )
      )
    )
  );

  getDurationISO$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDurationISO),
      exhaustMap(() =>
        this.service.getDurationISO().pipe(
          map((durationISO) =>
            getDurationISOSuccess({
              durationISOItems: durationISO.map((a) =>
                duractionIsoResponseToPropertyList(a)
              ),
            })
          )
        )
      )
    )
  );

  getGranularity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getGranularity),
      exhaustMap(() =>
        this.service.getGranularity().pipe(
          map((granularity) =>
            getGranularitySuccess({
              granularityItems: granularity.map((a) =>
                GranularityResponseToPropertyList(a)
              ),
            })
          )
        )
      )
    )
  );

  getPeriodicity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPeriodicity),
      exhaustMap(() =>
        this.service.getPeriodicity().pipe(
          map((periodicity) =>
            getPeriodicitySuccess({
              periodicityItems: periodicity.map((a) =>
                PeriodicityResponseToPropertyList(a)
              ),
            })
          )
        )
      )
    )
  );

  getLabels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getLabels),
      exhaustMap(() =>
        this.service.getLabels().pipe(
          map((labels) =>
            getLabelsSuccess({
              lablesItems: labels.map((a) => LabelsResponseToPropertyList(a)),
            })
          )
        )
      )
    )
  );

  getClasificationRegulatory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getClasificationRegulatory),
      exhaustMap(() =>
        this.service.getClasificationRegulatory().pipe(
          map((clasification) =>
            getClasificationRegulatorysuccess({
              clasificationRegulatory: clasification.map((a) =>
                ClasificationRegulatoryResponseToClasificationRegulatoryList(a)
              ),
            })
          )
        )
      )
    )
  );

  getTypeView$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTypeView),
      exhaustMap(() =>
        this.service.getTypeView().pipe(
          map((TypeView) =>
            getTypeViewsuccess({
              typeViewItems: TypeView.map((a) =>
                TypeViewResponseToTypeViewModel(a)
              ),
            })
          )
        )
      )
    )
  );

  saveDataBasicDataSet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveDataBasicDataSet),
      exhaustMap(({ dataBasicDataSet }) =>
        this.service.saveDataBasicDataSet(dataBasicDataSet).pipe(
          map((dataBasicInformation) =>
            saveDataBasicDataSetSuccess({
              saveDataBasicDataSet: dataBasicInformation,
            })
          ),
          catchError(() => [errorApi()])
        )
      )
    )
  );

  getHasRecord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getHasRecord),
      exhaustMap(({ idConfigurationDataSet }) =>
        this.service.getHasRecord(idConfigurationDataSet).pipe(
          map((hasRecord) =>
            getHasRecordSuccess({
              hasRecord: HasRecordResponseToHasRecordRModel(hasRecord),
            })
          )
        )
      )
    )
  );

  executePipeline$ = createEffect(() =>
    this.actions$.pipe(
      ofType(executePipeline),
      exhaustMap(({ nbSynapseName }) =>
        this.service.executePipeline(nbSynapseName)
          .pipe(map(() => getDatasets()))
      )
    )
  );

  cancelExecutePipeline$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cancelExecutePipeline),
      exhaustMap(({ pipelineRunid }) =>
        this.service.cancelExecutePipeline(pipelineRunid)
          .pipe(map(() => getDatasets()))
      )
    )
  );
}
