import { createAction, props } from '@ngrx/store';
import { TypesInterface } from 'src/app/model/types.model';

export const bank = createAction('[Users API] get bank Types');
export const bankSuccess = createAction('validate get bank Types Success', props<{bankList: TypesInterface[]}>());
export const bankError = createAction('validate get bank Types error', props<{msg: string, status: number}>());