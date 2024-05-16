import { createAction, props } from "@ngrx/store";
import { create } from "domain";
import { TablaCargar } from "src/app/interfaces/shareholders.interface";
import { Titles } from "src/app/model/titles.model";
import { Traslado } from "src/app/model/traslado.model";
import { AsignarAccion } from "src/app/pages/traslados/traslados.component";

export const getTraslatesList = createAction('[TransferList API] getTranslatesList', props<{ tablaCargar: TablaCargar }>());
export const getTranslatesListSuccess = createAction('getTranslatesList success', props<{ translates: Traslado[], count: number }>())

export const setCancelTitles = createAction('set cancel titles', props<{ titles: Titles[] }>())
export const cleanCancelTitles = createAction('clean cancel titles');

export const getTitlesListSelector = createAction('get titles list selector')
export const getTitlesListSelectorSuccess = createAction('get titles list selector success', props<{ titlesListSelector: Titles[] }>())

export const getIncompleteTitles = createAction('get incomplete titles')
export const getIncompleteTitlesSuccess = createAction('get incomplete titles success', props<{ titles: Titles[] }>())

export const transferTitle = createAction('transfer title', props<{ acciones: AsignarAccion[] }>())

export const deleteTranslate = createAction('delete translate', props<{ ID_REGISTRO: string }>())

export const editTransferTitle = createAction('edit translate', props<{acciones: AsignarAccion[]}>())

export const setStatusTraslados = createAction('set status traslados', props<{status: number, msg: string}>());
export const cleanStatusTraslados = createAction('clean status traslados');
