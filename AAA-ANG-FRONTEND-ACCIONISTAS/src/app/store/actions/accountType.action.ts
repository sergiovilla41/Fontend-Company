import { createAction, props } from '@ngrx/store';
import { TypesInterface } from 'src/app/model/types.model';

export const accountType = createAction('[Users API] get account Type');
export const accountTypeSuccess = createAction('validate get account Type Success', props<{accountTypeList: TypesInterface[]}>());
export const accountTypeError = createAction('validate get account Type error', props<{msg: string, status: number}>());