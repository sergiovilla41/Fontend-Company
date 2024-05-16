import { createAction, props } from '@ngrx/store';
import { TablaCargar } from 'src/app/interfaces/shareholders.interface';
import { Warranty } from 'src/app/model/warranty.model';

export const cleanState = createAction('clean state titles');

export const newWarranty = createAction('[Title API] create new Warranty', props<{ warranty: Warranty }>());
export const newWarrantySuccess = createAction('validate create new Warranty Success', props<{ msg: string, status: number }>());
export const newWarrantyError = createAction('validate create new Warranty error', props<{ msg: string, status: number }>());

export const updateWarranty = createAction('[Title API] update a Warranty', props<{ warranty: Warranty }>());
export const updateWarrantySuccess = createAction('validate update a Warranty Success', props<{ msg: string, status: number }>());
export const updateWarrantyError = createAction('validate update a Warranty error', props<{ msg: string, status: number }>());

export const deleteWarranty = createAction('[Title API] delete a Warranty', props<{ warranty: Warranty }>());
export const deleteWarrantySuccess = createAction('validate delete a Warranty Success', props<{ msg: string, status: number }>());
export const deleteWarrantyError = createAction('validate delete a Warranty error', props<{ msg: string, status: number }>());

export const exportExcelTitle = createAction('[Title API] export Excel title', props<{ paginador: TablaCargar }>());
export const exportExcelTitleSuccess = createAction('validate export Excel title Success', props<{ payload: any }>());
export const exportExcelTitleError = createAction('validate export Excel title error', props<{ msg: string, status: number }>());

export const exportCsvTitle = createAction('[Title API] export Csv title', props<{ paginador: TablaCargar }>());
export const exportCsvTitleSuccess = createAction('validate export Csv title Success', props<{ payload: any }>());
export const exportCsvTitleError = createAction('validate export Csv title error', props<{ msg: string, status: number }>());

export const exportPdfTitle = createAction('[Title API] export Pdf title', props<{ paginador: TablaCargar }>());
export const exportPdfTitleSuccess = createAction('validate export Pdf title Success', props<{ payload: any }>());
export const exportPdfTitleError = createAction('validate export Pdf title error', props<{ msg: string, status: number }>());

export const UpdateStateWarranty = createAction('validate update state');
