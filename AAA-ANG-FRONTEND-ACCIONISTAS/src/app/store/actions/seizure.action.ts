import { createAction, props } from '@ngrx/store';
import { TablaCargar } from 'src/app/interfaces/shareholders.interface';
import { CancelTitles } from 'src/app/model/cancelTitles.model';
import { Seizure } from 'src/app/model/seizure.model';
import { Titles } from 'src/app/model/titles.model';

export const cleanState = createAction('clean state titles');

export const newSeizure = createAction('[Title API] create new seizure', props<{ seizure: Seizure }>());
export const newSeizureSuccess = createAction('validate create new seizure Success', props<{ msg: string, status: number }>());
export const newSeizureError = createAction('validate create new seizure error', props<{ msg: string, status: number }>());

export const updateSeizure = createAction('[Title API] update a seizure', props<{ seizure: Seizure }>());
export const updateSeizureSuccess = createAction('validate update a seizure Success', props<{ msg: string, status: number }>());
export const updateSeizureError = createAction('validate update a seizure error', props<{ msg: string, status: number }>());

export const deleteSeizure = createAction('[Title API] delete a seizure', props<{ seizure: Seizure }>());
export const deleteSeizureSuccess = createAction('validate delete a seizure Success', props<{ msg: string, status: number }>());
export const deleteSeizureError = createAction('validate delete a seizure error', props<{ msg: string, status: number }>());

export const exportExcelTitle = createAction('[Title API] export Excel title', props<{ paginador: TablaCargar }>());
export const exportExcelTitleSuccess = createAction('validate export Excel title Success', props<{ payload: any }>());
export const exportExcelTitleError = createAction('validate export Excel title error', props<{ msg: string, status: number }>());

export const exportCsvTitle = createAction('[Title API] export Csv title', props<{ paginador: TablaCargar }>());
export const exportCsvTitleSuccess = createAction('validate export Csv title Success', props<{ payload: any }>());
export const exportCsvTitleError = createAction('validate export Csv title error', props<{ msg: string, status: number }>());

export const exportPdfTitle = createAction('[Title API] export Pdf title', props<{ paginador: TablaCargar }>());
export const exportPdfTitleSuccess = createAction('validate export Pdf title Success', props<{ payload: any }>());
export const exportPdfTitleError = createAction('validate export Pdf title error', props<{ msg: string, status: number }>());

export const UpdateStateSeizure = createAction('validate update state');
