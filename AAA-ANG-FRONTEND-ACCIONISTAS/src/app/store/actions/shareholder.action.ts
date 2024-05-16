import { createAction, props } from '@ngrx/store';
import { TablaCargar } from 'src/app/interfaces/shareholders.interface';
import { Shareholders } from 'src/app/model/shareholders.model';

export const newShareholder = createAction('[Shareholder API] create new shareholder', props<{ shareholder: Shareholders }>());
export const newShareholderSuccess = createAction('validate create new shareholder Success', props<{ msg: string, status: number }>());
export const newShareholderError = createAction('validate create new shareholder error', props<{ msg: string, status: number }>());

export const UpdateShareholder = createAction('[Shareholder API] update a shareholder', props<{ shareholder: Shareholders }>());
export const UpdateShareholderSuccess = createAction('validate update a shareholder Success', props<{ msg: string, status: number }>());
export const UpdateShareholderError = createAction('validate update a shareholder error', props<{ msg: string, status: number }>());


export const shareholderList = createAction('[Shareholder API] shareholderList');
export const shareholderListSuccess = createAction('shareholderList Success', props<{ shareholderList: Shareholders[] }>());
export const shareholderListError = createAction('shareholderList error', props<{ msg: string, status: number }>());


export const shareholderSeizureList = createAction('[Shareholder API] shareholderSeizureList');
export const shareholderSeizureListSuccess = createAction('shareholderSeizureList Success', props<{ shareholderSeizureList: Shareholders[] }>());
export const shareholderSeizureListError = createAction('shareholderSeizureList error', props<{ msg: string, status: number }>());


export const shareholderWarrantyList = createAction('[Shareholder API] shareholderWarrantyList');
export const shareholderWarrantyListSuccess = createAction('shareholderWarrantyList Success', props<{ shareholderWarrantyList: Shareholders[] }>());
export const shareholderWarrantyListError = createAction('shareholderWarrantyList error', props<{ msg: string, status: number }>());


/* export const deleteUser = createAction('[Users API] delete  a user', props<{ user: UsersList }>());
export const deletUserSuccess = createAction('validate delete a user Success', props<{ msg: string, status: number }>());
export const deletUserError = createAction('validate delete a user error', props<{ msg: string, status: number }>()); */

export const exportExcelShareholder = createAction('[Shareholder API] export Excel shareholder', props<{ paginador: TablaCargar }>());
export const exportExcelShareholderSuccess = createAction('validate export Excel shareholder Success', props<{ payload: any }>());
export const exportExcelShareholderError = createAction('validate export Excel shareholder error', props<{ msg: string, status: number }>());

export const exportCsvShareholder  = createAction('[Shareholder API] Export CSV Shareholder', props<{ paginador: TablaCargar }>());
export const exportCsvShareholderSuccess = createAction('validate Export CSV Shareholder Success', props<{ payload: any }>());
export const exportCsvShareholderError = createAction('validate Export CSV Shareholder error', props<{ msg: string, status: number }>());

export const exportPdfShareholder  = createAction('[Shareholder API] Export Pdf Shareholder', props<{ paginador: TablaCargar }>());
export const exportPdfShareholderSuccess = createAction('validate Export Pdf Shareholder Success', props<{ payload: any }>());
export const exportPdfShareholderError = createAction('validate Export Pdf Shareholder error', props<{ msg: string, status: number }>());

export const UpdateStateShareholder = createAction('validate update state');