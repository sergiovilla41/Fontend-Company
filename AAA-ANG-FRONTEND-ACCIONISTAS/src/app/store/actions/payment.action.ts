import { createAction, props } from '@ngrx/store';
import { TablaCargar } from 'src/app/interfaces/shareholders.interface';
import { Payment } from 'src/app/model/payment.model';
import { Seizure } from 'src/app/model/seizure.model';


/* export const newSeizure = createAction('[Title API] create new seizure', props<{ seizure: Seizure }>());
export const newSeizureSuccess = createAction('validate create new seizure Success', props<{ msg: string, status: number }>());
export const newSeizureError = createAction('validate create new seizure error', props<{ msg: string, status: number }>());
 */
export const updatePayment = createAction('[Payment API] update a payment', props<{ payment: Payment }>());
export const updatePaymentSuccess = createAction('validate update a payment Success', props<{ msg: string, status: number }>());
export const updatePaymentError = createAction('validate update a payment error', props<{ msg: string, status: number }>());

export const deletePayment = createAction('[Payment API] delete a payment', props<{ payment: Payment }>());
export const deletePaymentSuccess = createAction('validate delete a payment Success', props<{ msg: string, status: number }>());
export const deletePaymentError = createAction('validate delete a payment error', props<{ msg: string, status: number }>());

export const exportExcelTitle = createAction('[Title API] export Excel title', props<{ paginador: TablaCargar }>());
export const exportExcelTitleSuccess = createAction('validate export Excel title Success', props<{ payload: any }>());
export const exportExcelTitleError = createAction('validate export Excel title error', props<{ msg: string, status: number }>());

export const exportCsvTitle = createAction('[Title API] export Csv title', props<{ paginador: TablaCargar }>());
export const exportCsvTitleSuccess = createAction('validate export Csv title Success', props<{ payload: any }>());
export const exportCsvTitleError = createAction('validate export Csv title error', props<{ msg: string, status: number }>());

export const exportPdfTitle = createAction('[Title API] export Pdf title', props<{ paginador: TablaCargar }>());
export const exportPdfTitleSuccess = createAction('validate export Pdf title Success', props<{ payload: any }>());
export const exportPdfTitleError = createAction('validate export Pdf title error', props<{ msg: string, status: number }>());

export const UpdateStatePayment = createAction('validate update state');
