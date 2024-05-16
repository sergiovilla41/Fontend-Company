import { createAction, props } from '@ngrx/store';
import { TablaCargar } from 'src/app/interfaces/shareholders.interface';
import { CancelTitles } from 'src/app/model/cancelTitles.model';
import { EditTitles } from 'src/app/model/editTitles.model';
import { Titles } from 'src/app/model/titles.model';

export const cleanState = createAction('clean state titles');

export const newTitle = createAction('[Title API] create new title', props<{ title: Titles }>());
export const newTitleSuccess = createAction('validate create new title Success', props<{ msg: string, status: number }>());
export const newTitleError = createAction('validate create new title error', props<{ msg: string, status: number }>());

export const cancelTitle = createAction('[Title API] cancel a title', props<{ cancelTitles: CancelTitles }>());
export const cancelTitleSuccess = createAction('validate cancel a title Success', props<{ msg: string, status: number }>());
export const cancelTitleError = createAction('validate cancel a title error', props<{ msg: string, status: number }>());


export const editTitle = createAction('[Title API] edit a title', props<{ editTitles : EditTitles }>());
export const editTitleSuccess = createAction('validate edit a title Success', props<{ msg: string, status: number }>());
export const editTitleError = createAction('validate edit a title error', props<{ msg: string, status: number }>());


export const deleteTitle = createAction('[Title API] delete a title', props<{ editTitles : EditTitles }>());
export const deleteTitleSuccess = createAction('validate delete a title Success', props<{ msg: string, status: number }>());
export const deleteTitleError = createAction('validate delete a title error', props<{ msg: string, status: number }>());

export const titleList = createAction('[Shareholder API] titleList');
export const titleListSuccess = createAction('titleList Success', props<{ titleList: Titles[] }>());
export const titleListError = createAction('titleList error', props<{ msg: string, status: number }>());

export const exportExcelTitle = createAction('[Title API] export Excel title', props<{ paginador: TablaCargar }>());
export const exportExcelTitleSuccess = createAction('validate export Excel title Success', props<{ payload: any }>());
export const exportExcelTitleError = createAction('validate export Excel title error', props<{ msg: string, status: number }>());

export const exportCsvTitle = createAction('[Title API] export Csv title', props<{ paginador: TablaCargar }>());
export const exportCsvTitleSuccess = createAction('validate export Csv title Success', props<{ payload: any }>());
export const exportCsvTitleError = createAction('validate export Csv title error', props<{ msg: string, status: number }>());

export const exportPdfTitle = createAction('[Title API] export Pdf title', props<{ paginador: TablaCargar }>());
export const exportPdfTitleSuccess = createAction('validate export Pdf title Success', props<{ payload: any }>());
export const exportPdfTitleError = createAction('validate export Pdf title error', props<{ msg: string, status: number }>());


// lista selector reportes titulos

export const titleShareholder = createAction('[Users API] get titleShareholder and city',  props<{titulo_uuid: string}>());
export const titleShareholderSuccess = createAction('validate get titleShareholder Success', props<{title: Titles[]}>());
export const titleShareholderError = createAction('validate get titleShareholder error', props<{msg: string, status: number}>());

export const UpdateStateTitle = createAction('validate update state');
